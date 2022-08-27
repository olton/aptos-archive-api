import {Result} from "../helpers/result.js";

export const CoinsAPI = {
    transferCoinCount: async () => {
        const sql = `
            select coin_total,
                   coin_max,
                   coin_min,
                   coin_avg
            from coin_counters
            where function = 'transfer'
        `
        try {
            const result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async mintCoinCount (){
        const sql = `
            select coin_total,
                   coin_max,
                   coin_min,
                   coin_avg
            from coin_counters
            where function = 'mint' 
        `
        try {
            const result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async incomingPayments (address, {limit= 25, start = 0} = {}) {
        const sql = `
            select 
                vtc.*,
                t.version,
                t.timestamp
            from v_transfer_coin vtc 
                left join transactions t on vtc.id = t.id
            where version >= $3 and receiver = $1            
            limit $2
        `

        try {
            const result = (await this.query(sql, [address, limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async outgoingPayments (address, {limit= 25, start = 0} = {}) {
        const sql = `
            select
                vtc.*,
                t.version,
                t.timestamp
            from v_transfer_coin vtc
                left join transactions t on vtc.id = t.id
            where version >= $3 and sender = $1
            limit $2
        `

        try {
            const result = (await this.query(sql, [address, limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async payments ({limit= 25, start = 0} = {}) {
        const sql = `
            select
                vtc.*,
                t.version,
                t.timestamp
            from v_transfer_coin vtc
                left join transactions t on vtc.id = t.id
            where version >= $3
            limit $2
        `

        try {
            const result = (await this.query(sql, [limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async mintAddress (address, {limit= 25, start = 0} = {}) {
        const sql = `
            select
                v.*,
                t.version,
                t.timestamp
            from v_mint_coin v
                left join transactions t on v.id = t.id
            where version >= $3 and receiver = $1
            limit $2
        `

        try {
            const result = (await this.query(sql, [address, limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async mint ({order = "version", limit= 25, start = 0} = {}) {
        const sql = `
            select
                v.*,
                t.version,
                t.timestamp
            from v_mint_coin v
                left join transactions t on v.id = t.id
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
}