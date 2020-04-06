const user = "julia";
const pass = "Tr0uty8ab0n3";
const paths = require("./paths/jw-paths.js");

module.exports = {
	credentials : {
		username: user,
		password: pass
	},
	paths : paths.paths,
	widths: [480, 600, 1024, 1440]
};