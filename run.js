const test= require("./src/test.js");
const config = require("./configs/config.js");

console.log("Beginning captures on " + process.env.url);
test.testAllPaths(process.env.url, config.paths, config.credentials, config.widths);