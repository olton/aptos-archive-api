import Archive from "../src/index.js";

const arch = new Archive()

// console.log(await arch.events())
// console.log(await arch.eventsByType("0x1::stake::DistributeRewardsEvent"))
console.log(await arch.eventsByAddress("0x2fa363bbc0378c3767de32caed3c6a00aa02dc51ff840e0bdd13328404caf49a", {limit: 1000}))
