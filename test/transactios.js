import Archive from "../src/index.js";

const arch = new Archive()

console.log(await arch.transactions({limit:2}))