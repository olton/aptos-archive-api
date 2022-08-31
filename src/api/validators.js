import {Result} from "../helpers/result.js";

export const ValidatorsAPI = {
    async currentRound(){
        const sql = `
            select
                version,
                epoch,
                round
            from meta_transactions bt
                     left join transactions t on bt.id = t.id
            order by t.timestamp desc limit 1
        `

        try {
            const result = (await this.query(sql)).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message)
        }
    },

    async roundsPerEpoch (epoch_count = 10) {
        const sql = `
            select
                epoch,
                count(round) as rounds
            from meta_transactions
            group by epoch
            order by epoch desc
            limit $1
        `

        try {
            const result = (await this.query(sql, [epoch_count])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    },

    async roundsPerEpochByAddress (address, epoch_count = 10) {
        const sql = `
            select
                epoch,
                count(round) as rounds
            from meta_transactions
            where proposer = $1
            group by epoch
            order by epoch desc
            limit $2
        `

        try {
            const result = (await this.query(sql, [address, epoch_count])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    },

    async roundsInTime (trunc = 'minute', limit = 60) {
        const sql = `
            select
                date_trunc('%TRUNC%', timestamp) as timestamp,
                count(round) as rounds
            from meta_transactions t
            group by 1
            order by 1 desc
            limit $1
        `.replace('%TRUNC%', trunc)

        try {
            const result = (await this.query(sql, [limit])).rows
            return new Result(true, "OK", result)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    }
}