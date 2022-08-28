import Archive from "../src/index.js";

const arch = new Archive()

console.log(await arch.transactionsCount())
// console.log(await arch.transactionsFromAddress("0xbcf1a92d672640a70820f329c3923b56dd5d3368512b44a559f9d6d14c6d1973", {limit:2}))