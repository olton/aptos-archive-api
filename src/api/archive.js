import {Result} from "../helpers/result.js";

export const ArchiveAPI = {
    async state(){
        const sql = `select * from archive_status`
        try {
            const result = (await this.query(sql)).rows[0]
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async ledger(){
        const sql = `select * from ledger`
        try {
            const result = (await this.query(sql)).rows[0]
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },
}