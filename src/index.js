import path from "path"
import {fileURLToPath} from "url"
import {Postgres} from "./helpers/postgres.js"
import {readJson} from "./helpers/readers.js"
import {ArchiveAPI} from "./api/archive.js"
import {NftAPI} from "./api/nft.js";
import {TransactionsAPI} from "./api/transactions.js";
import {CoinsAPI} from "./api/coins.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url))

const connectData = readJson(path.resolve(__dirname, 'connect.json'))

const defaultApiOptions = {
    debug: false,
    max: 20,
    allowExitOnIdle: true,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 0
}

class Archive {
    constructor(options) {
        this.connect = {
            ...connectData
        }
        this.options = Object.assign({}, defaultApiOptions, options)
        this.pool = null

        this.createDBConnection()
    }
}

Object.assign(Archive.prototype,
    Postgres,
    ArchiveAPI,
    NftAPI,
    CoinsAPI,
    TransactionsAPI
)

export default Archive