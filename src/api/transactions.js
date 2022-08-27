import {Result} from "../helpers/result.js";

export const TransactionsAPI = {
    async transactions({order = "timestamp", limit = 25, start = 0}){
        const sql = `
            select *
            from v_transactions
            where version >= $2
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
            select *
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
            select *
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
    }
}