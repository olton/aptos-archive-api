import {Result} from "../helpers/result.js";

export const GasAPI = {
    async gasCount(){
        const sql = `
            select coin_total,
                   coin_max,
                   coin_min,
                   coin_avg
            from coin_counters
            where function = 'gas'
        `
        try {
            let result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    }
}