const test= require("./src/test.js");
const config = require("./configs/itruns.js");

console.log("Beginning captures on " + config.url);

test.testAllPaths(config.url, config.paths, config.credentials);