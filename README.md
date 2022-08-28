# Welcome to Aptos Archive API

## Install
```shell
npm install @olton/archive-api --save
```

## Api Config
Api configuration file `connect.conf` placed in src folder. 

## Init
```javascript
const arch = new Archive()
```

## Functions
### Archive API
- [x] state() - return archive state (current store version and timestamp)
- [x] ledger() - return current ledger state

### Coins API
- [x] transferCoinCount()
- [x] mintCoinCount()
- [x] incomingPayments(address, {limit, start})
- [x] outgoingPayments(address, {limit, start})
- [x] payments({limit, start})
- [x] mintAddress(address, {limit, start})
- [x] mint({order, limit, start})

### Nft API
- [x] collectionsCount()
- [x] collections({order, limit, start})
- [x] collectionsByName(name, {order, limit, start})
- [x] collectionsByAddress(address, {order, limit, start})
- [x] tokensCount()
- [x] tokens({order, limit, start})
- [x] tokensByName(name, {order, limit, start})
- [x] tokensByAddress(address, {order, limit, start})

### Transactions API
- [x] transactions({order, limit, start})
- [x] userTransactions({order, limit, start})
- [x] metaTransactions({order, limit, start})
- [x] stateTransactions({order, limit, start})
- [x] transactionsFromAddress(address, {order, limit, start})
- [x] genesis()
- [x] transactionsCount()

### Validators API
- [x] currentRound()
- [x] roundsPerEpoch(epoch_count)
- [x] roundsInTime(trunc, limit)