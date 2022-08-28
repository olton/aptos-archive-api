import {Result} from "../helpers/result.js";

export const OperationsAPI = {
    async operationsCount () {
        const sql = `
            select function, count(*)
            from payloads
            group by function
            order by function
        `
        try {
            let result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    }
}