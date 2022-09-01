import {Result} from "../helpers/result.js";

export const EventAPI = {
    async events({order = 'id', limit = 25, start = 0} = {}){
        const sql = `
            select 
                e.id,
                e.key, 
                e.sequence_number,
                e.type,
                e.data
            from events e
                left join v_transactions vt on e.id = vt.id
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

    async eventsByType(type, {order = 'id', limit = 25, start = 0} = {}){
        const sql = `
            select 
                e.id,
                e.key, 
                e.sequence_number,
                e.type,
                e.data
            from events e
                left join v_transactions vt on e.id = vt.id
            where version >= $3 and e.type = $1
            order by '%ORDER%'
            limit $2
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [type, limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async eventsByKey(key, {order = 'id', limit = 25, start = 0} = {}){
        const sql = `
            select 
                e.id,
                e.key, 
                e.sequence_number,
                e.type,
                e.data
            from events e
                left join v_transactions vt on e.id = vt.id
            where version >= $3 and e.type = $1
            order by '%ORDER%'
            limit $2
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [key, limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async eventsByAddress(address, {order = 'id', limit = 25, start = 0} = {}){
        const sql = `
            select 
                e.id,
                e.key, 
                e.sequence_number,
                e.type,
                e.data,
                coalesce(ut.sender, mt.proposer, 'unknown') as sender
            from events e
                left join v_transactions vt on e.id = vt.id
                left join user_transactions ut on e.id = ut.id
                left join meta_transactions mt on e.id = ut.id
            where version >= $3 and coalesce(ut.sender, mt.proposer, 'unknown') = $1
            order by '%ORDER%'
            limit $2
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [address, limit, start])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },
}