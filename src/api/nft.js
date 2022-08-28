import {Result} from "../helpers/result.js";
import {isHex} from "../helpers/is-hex.js";

const decodeCollection = (result) => {
    for(let r of result) {
        if (isHex(r.name)) r.name = Buffer.from(r.name, 'hex').toString('utf-8')
        if (isHex(r.description)) r.description = Buffer.from(r.description, 'hex').toString('utf-8')
        if (isHex(r.uri)) r.uri = Buffer.from(r.uri, 'hex').toString('utf-8')
    }

    return result
}

const decodeToken = (result) => {
    for(let r of result) {
        if (isHex(r.collection)) r.collection = Buffer.from(r.collection, 'hex').toString('utf-8')
        if (isHex(r.name)) r.name = Buffer.from(r.name, 'hex').toString('utf-8')
        if (isHex(r.description)) r.description = Buffer.from(r.description, 'hex').toString('utf-8')
        if (isHex(r.uri)) r.uri = Buffer.from(r.uri, 'hex').toString('utf-8')
    }

    return result
}

const encodeStr = (str) => !isHex(str) ? Buffer.from(str, 'utf-8').toString('hex') : str

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

    async collections({order = "version", limit = 25, start = 0} = {}){
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
            let result = (await this.query(sql, [limit, start])).rows
            result = decodeCollection(result)
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async collectionsByName(name, {order = "version", limit = 25, start = 0} = {}){
        const sql = `
        select 
            c.*, 
            t.version, 
            t.timestamp 
        from collections c
            left join transactions t on t.id = c.fk_id
        where version >= $3 and (name like '%' || $1 || '%' or name like '%' || ${encodeStr(name)} || '%')
        order by '%ORDER%'
        limit $2
    `.replace("'%ORDER%'", order)
        try {
            let result = (await this.query(sql, [name, limit, start])).rows
            result = decodeCollection(result)
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async collectionsByAddress(address, {order = "version", limit = 25, start = 0} = {}){
        const sql = `
        select 
            c.*, 
            t.version, 
            t.timestamp 
        from collections c
            left join transactions t on t.id = c.fk_id
        where version >= $3 and address = $1
        order by '%ORDER%'
        limit $2
    `.replace("'%ORDER%'", order)
        try {
            let result = (await this.query(sql, [name, limit, start])).rows
            result = decodeCollection(result)
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

    async tokens({order = "version", limit = 25, start = 0} = {}){
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
            let result = (await this.query(sql, [limit, start])).rows
            result = decodeToken(result)
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async tokensByName(name, {order = "version", limit = 25, start = 0} = {}){
        const sql = `
        select 
            c.*, 
            t.version, 
            t.timestamp 
        from tokens c
            left join transactions t on t.id = c.fk_id
        where version >= $3 and (c.name = $1 or c.name = '${encodeStr(name)}')
        order by '%ORDER%'
        limit $2
    `.replace("'%ORDER%'", order)
        try {
            let result = (await this.query(sql, [name, limit, start])).rows
            result = decodeToken(result)
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    },

    async tokensByAddress(address, {order = "version", limit = 25, start = 0} = {}){
        const sql = `
        select 
            c.*, 
            t.version, 
            t.timestamp 
        from tokens c
            left join transactions t on t.id = c.fk_id
        where version >= $3 and c.address = $1
        order by '%ORDER%'
        limit $2
    `.replace("'%ORDER%'", order)
        try {
            let result = (await this.query(sql, [address, limit, start])).rows
            result = decodeToken(result)
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    },
}