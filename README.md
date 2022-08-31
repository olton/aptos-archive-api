# Welcome to Aptos Archive API

## Install
```shell
npm install @olton/aptos-archive-api --save
```

## Api Config
Api configuration file `connect.conf` placed in src folder. 

## Init & Using
```javascript
const arch = new Archive() // when config.json exist or
const arch = new Archive({
    "proto": "http",
    "host": "archive.aptosnet.com",
    "port": 5432,
    "user": "user",
    "password": "password",
    "database": "aptos_archive",
    "options": {
        "allowExitOnIdle": true,
        "max": 3000
    }
})
const collectionCount = await arch.collectionsCount()
```

## Functions
### Archive API
- [x] state() - return archive state (current store version and timestamp)
- [x] ledger() - return current ledger state
```javascript
const state = await arch.state()
const ledger = await arch.ledger()
```

### Coins API
- [x] transferCoinCount()
- [x] mintCoinCount()
- [x] incomingPayments(address, {order, limit, start})
- [x] outgoingPayments(address, {order, limit, start})
- [x] payments({order, limit, start})
- [x] mintAddress(address, {order, limit, start})
- [x] mint({order, limit, start})
```javascript
const tran_count = await arch.transferCoinCount()
const mint_count = await arch.mintCoinCount()
const incoming = await arch.incomingPayments("0x123...", {limit: 25, start: 0})
const outgoing = await arch.outgoingPayments("0x123...", {limit: 25, start: 0})
const payments = await arch.payments({limit: 25, start: 0})
const mintAddr = await arch.mintAddress("0x123...", {limit: 25, start: 0})
const mint = await arch.mint({order: "version desc", limit: 25, start: 0})
```

### Nft API
- [x] collectionsCount()
- [x] collections({order, limit, start})
- [x] collectionsByName(name, {order, limit, start})
- [x] collectionsByAddress(address, {order, limit, start})
- [x] tokensCount()
- [x] tokens({order, limit, start})
- [x] tokensByName(name, {order, limit, start})
- [x] tokensByAddress(address, {order, limit, start})
```javascript

```
### Transactions API
- [x] transactions({order, limit, start})
- [x] userTransactions({order, limit, start})
- [x] metaTransactions({order, limit, start})
- [x] stateTransactions({order, limit, start})
- [x] transactionsFromAddress(address, {order, limit, start})
- [x] proposalTransactions(address, {order, limit, start})
- [x] genesis()
- [x] transactionsCount()
```javascript
const trans = await transactions({order:"version", limit:25, start:0})
const genesis = await arch.genesis()
const counts = await arch.transactionsCount()
```
### Validators API
- [x] currentRound()
- [x] roundsPerEpoch(epoch_count)
- [x] roundsPerEpochByAddress(address, epoch_count)
- [x] roundsInTime(trunc, limit)
```javascript
const currentRound = await arch.currentRoun()
const roundsPerEpoch = await arch.roundsPerEpoch(10)
const roundsInTime = await arch.roundsInTime("minute", 60)
```