import fs from "fs";
import path from "path"
import {fileURLToPath} from "url"
import {Postgres} from "./helpers/postgres.js"
import {readJson} from "./helpers/readers.js"
import {ArchiveAPI} from "./api/archive.js"
import {NftAPI} from "./api/nft.js";
import {TransactionsAPI, TRANSACTION_TYPE_STATE, TRANSACTION_TYPE_META, TRANSACTION_TYPE_USER} from "./api/transactions.js";
import {CoinsAPI} from "./api/coins.js";
import {ValidatorsAPI} from "./api/validators.js";
import {GasAPI} from "./api/gas.js";
import {OperationsAPI} from "./api/operations.js";
import {EventAPI} from "./api/events.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url))

let connectData
if (fs.existsSync(path.resolve(__dirname, 'config.json'))) {
  connectData  = readJson(path.resolve(__dirname, 'config.json'))
}

const defaultApiOptions = {
    debug: false,
    max: 20,
    allowExitOnIdle: true,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 0
}

class Archive {
    constructor(connect, options) {
        if (connect) {
            this.connect = {
                ...connect
            }
        } else {
            this.connect = {
                ...connectData
            }
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
    TransactionsAPI,
    ValidatorsAPI,
    GasAPI,
    OperationsAPI,
    EventAPI
)

export {
    TRANSACTION_TYPE_STATE, TRANSACTION_TYPE_META, TRANSACTION_TYPE_USER
}

export default Archive