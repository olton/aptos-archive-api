import Archive from "../src/index.js";

const arch = new Archive()

console.log(await arch.state())
console.log(await arch.ledger())