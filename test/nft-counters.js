import Archive from "../src/index.js";

const arch = new Archive()

// console.log(await arch.collectionsCount())
// console.log(await arch.tokensCount())
// console.log("Col", await arch.collections())
// console.log("Tok", await arch.tokens({limit: 2}))

console.log(await arch.tokensByAddress("0x102df6fed115a3b5edb549e2c6d7b8062c743cd1b7de4f68d77216ab3d577c2e", {limit: 20}))