import {Result} from "../helpers/result.js";

export const OperationsAPI = {
    async operationsCount () {
        const sql = `
            select split_part(function::text, '::', 2) || '::' || split_part(function::text, '::', 3) as function, count(*)
            from payloads
            group by 1
            order by 1
        `
        try {
            let result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    }
}