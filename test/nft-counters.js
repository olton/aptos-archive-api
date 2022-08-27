import Archive from "../src/index.js";

const arch = new Archive()

// console.log(await arch.collectionsCount())
// console.log(await arch.tokensCount())
// console.log("Col", await arch.collections({limit: 2}))
// console.log("Tok", await arch.tokens({limit: 2}))

console.log(await arch.collectionsByName("Alice's cat collection"))