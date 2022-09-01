import {Result} from "../helpers/result.js";

export const EventAPI = {
    async events({order = 'id', limit = 25, start = 0} = {}){
        const sql = `
            select 
                e.id,
                e.key, 
                e.sequence_number,
                e.type,
                e.data,
                vt.version,
                vt.success,
                vt.vm_status,
                vt.hash,
                vt.timestamp,
                vt.type as trans_type,
                vs.sender
            from events e
                left join v_transactions vt on e.id = vt.id
                left join v_senders vs on e.id = vs.id
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
                e.data,
                vt.version,
                vt.success,
                vt.vm_status,
                vt.hash,
                vt.timestamp,
                vt.type as trans_type,
                vs.sender
            from events e
                left join v_transactions vt on e.id = vt.id
                left join v_senders vs on e.id = vs.id
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
                e.data,
                vt.version,
                vt.success,
                vt.vm_status,
                vt.hash,
                vt.timestamp,
                vt.type as trans_type,
                vs.sender
            from events e
                left join v_transactions vt on e.id = vt.id
                left join v_senders vs on e.id = vs.id
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
                vs.sender,
                vt.version,
                vt.success,
                vt.vm_status,
                vt.hash,
                vt.timestamp,
                vt.type as trans_type,
                vs.sender
            from events e
                left join v_transactions vt on e.id = vt.id
                left join v_senders vs on vs.id = e.id
            where version >= $2 and vs.id = e.id
            order by '%ORDER%'
            limit $1
        `.replace("'%ORDER%'", order)

        try {
            const result = (await this.query(sql, [limit, start])).rows
            const filtered = result.filter(v => {
                return v.sender === address
            })
            return new Result(true, "OK", filtered)
        } catch (e) {
            return new Result(false, e.message)
        }
    },
}