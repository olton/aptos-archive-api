import {Result} from "../helpers/result.js";

export const TRANSACTION_TYPE_USER = 'user'
export const TRANSACTION_TYPE_META = 'meta'
export const TRANSACTION_TYPE_STATE = 'state'

export const TransactionsAPI = {
    async transactions({order = "timestamp", limit = 25, start = 0}){
        const sql = `
            select vt.*,
                coalesce(ut.sender, mt.proposer, null) as sender,
                coalesce(ut.sequence_number, 0) as sequence_number,
                coalesce(ut.max_gas_amount, 0) as max_gas_amount,
                coalesce(ut.max_gas_amount, 0) as max_gas_amount
            from v_transactions vt
                left join user_transactions ut on vt.id = ut.id
                left join meta_transactions mt on mt.id = ut.id
            where vt.version >= $2
            order by '%ORDER%'
            limit $1 
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async userTransactions ({order = "timestamp", limit = 25, start = 0}) {
        const sql = `
            select vt.*,
                   ut.sender,
                   ut.sequence_number,
                   ut.max_gas_amount,
                   ut.gas_unit_price
            from v_transactions vt
              left join user_transactions ut on vt.id = ut.id 
            where type::text = 'user'
            and version >= $2
            order by '%ORDER%'
            limit $1 offset $2
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async metaTransactions ({order = "timestamp", limit = 25, start = 0}) {
        const sql = `
            select vt.*,
                   mt.proposer as sender,
                   mt.epoch,
                   mt.round,
                   mt.previous_block_votes,
                   mt.failed_proposer_indices
            from v_transactions vt
              left join meta_transactions mt on vt.id = mt.id 
            where type::text = 'meta'
            and version >= $2
            order by '%ORDER%'
            limit $1 offset $2
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async stateTransactions ({order = "timestamp", limit = 25, start = 0}) {
        const sql = `
            select *
            from v_transactions vt
              left join state_transactions mt on vt.id = mt.id 
            where type::text = 'state'
            and version >= $2
            order by '%ORDER%'
            limit $1 offset $2
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async transactionsFromAddress (address, {order = "version", limit = 25, offset = 0}={}) {
        const fields = `
        `
        const sql = `
            with transactions as (
            select t.*,
                   ut.sender
            from transactions t
            left join user_transactions ut on t.id = ut.id
            left join payloads p on t.id = p.id
            where ut.sender = $1
            
            union all
            
            select t.*,
                   mt.proposer as sebder                   
            from transactions t
            left join meta_transactions mt on t.id = mt.id
            where mt.proposer = $1
            )
            select * from transactions
            order by '%ORDER%'
            limit $2 offset $3        
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [address, limit, offset])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    },

    async genesis(){
        const sql = `
            select *
            from v_transactions vt
            where type::text = 'genesis'
        `

        try {
            const result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async transactionsCount(){
        const sql = `
            select * from counters 
        `

        try {
            const result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async transactionsPerSecond(limit = 3600){
        const sql = `
            with trans as (
                select
                    t.version,
                    t.timestamp at time zone 'utc' as timestamp
                from transactions t
                order by version desc limit 100000
            )
            select
                date_trunc('second', tr.timestamp) as minute,
                count(tr.version)
            from trans tr
            group by 1
            order by 1 desc
            limit $1
        `
        try {
            const result = (await this.query(sql, [limit])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async transactionsPerSecondByType(type = TRANSACTION_TYPE_USER, limit = 3600){
        const sql = `
            with trans as (
                select
                    t.version,
                    t.timestamp at time zone 'utc' as timestamp
                from transactions t
                where t.type = $1
                order by version desc limit 100000
            )
            select
                date_trunc('second', tr.timestamp) as minute,
                count(tr.version)
            from trans tr
            group by 1
            order by 1 desc
            limit $2
        `
        try {
            const result = (await this.query(sql, [type, limit])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async transactionsPerMinute(limit = 60){
        const sql = `
            with trans as (
                select
                    t.version,
                    t.timestamp at time zone 'utc' as timestamp
                from transactions t
                order by version desc limit 100000
            )
            select
                date_trunc('minute', tr.timestamp) as minute,
                count(tr.version)
            from trans tr
            group by 1
            order by 1 desc
            limit $1
        `
        try {
            const result = (await this.query(sql, [limit])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async transactionsPerMinuteByType(type = TRANSACTION_TYPE_USER, limit = 60){
        const sql = `
            with trans as (select
                        t.version,
                        t.timestamp at time zone 'utc' as timestamp
                    from transactions t
                    where t.type = $1
                    order by t.version desc limit 100000)
            select
                date_trunc('minute', tr.timestamp) as minute,
                count(tr.version)
            from trans tr
            group by 1
            order by 1 desc
            limit $2
        `
        try {
            const result = (await this.query(sql, [type, limit])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },
}