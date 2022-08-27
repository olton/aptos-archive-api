import {Result} from "../helpers/result.js";
import {isHex} from "../helpers/is-hex.js";

export const NftAPI = {
    async collectionsCount(){
        const sql = `
        select count(*) from collections 
    `
        try {
            const result = (await this.query(sql)).rows[0]
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async collections({order = "name", limit = 25, start = 0} = {}){
        const sql = `
        select 
            c.*, 
            t.version, 
            t.timestamp 
        from collections c
            left join transactions t on t.id = c.fk_id
        where version >= $2
        order by '%ORDER%'
        limit $1
    `.replace("'%ORDER%'", order)
        try {
            const result = (await this.query(sql, [limit, start])).rows
            for(let r of result) {
                if (isHex(r.name)) r.name = Buffer.from(r.name, 'hex').toString('utf-8')
                if (isHex(r.description)) r.description = Buffer.from(r.description, 'hex').toString('utf-8')
                if (isHex(r.uri)) r.uri = Buffer.from(r.uri, 'hex').toString('utf-8')
            }
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async collectionsByName(name, {order = "name", limit = 25, start = 0} = {}){
        const sql = `
        select 
            c.*, 
            t.version, 
            t.timestamp 
        from collections c
            left join transactions t on t.id = c.fk_id
        where version >= $3 and name like '%' || $1 || '%'
        order by '%ORDER%'
        limit $2
    `.replace("'%ORDER%'", order)
        try {
            const result = (await this.query(sql, [name, limit, start])).rows
            for(let r of result) {
                if (isHex(r.name)) r.name = Buffer.from(r.name, 'hex').toString('utf-8')
                if (isHex(r.description)) r.description = Buffer.from(r.description, 'hex').toString('utf-8')
                if (isHex(r.uri)) r.uri = Buffer.from(r.uri, 'hex').toString('utf-8')
            }
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async tokensCount(){
        const sql = `
        select count(*) from tokens 
    `
        try {
            const result = (await this.query(sql)).rows[0]
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async tokens({order = "name", limit = 25, start = 0} = {}){
        const sql = `
        select 
            c.*, 
            t.version, 
            t.timestamp 
        from tokens c
            left join transactions t on t.id = c.fk_id
        where version >= $2
        order by '%ORDER%'
        limit $1
    `.replace("'%ORDER%'", order)
        try {
            const result = (await this.query(sql, [limit, start])).rows
            for(let r of result) {
                if (isHex(r.collection)) r.collection = Buffer.from(r.collection, 'hex').toString('utf-8')
                if (isHex(r.name)) r.name = Buffer.from(r.name, 'hex').toString('utf-8')
                if (isHex(r.description)) r.description = Buffer.from(r.description, 'hex').toString('utf-8')
                if (isHex(r.uri)) r.uri = Buffer.from(r.uri, 'hex').toString('utf-8')
            }
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },
}