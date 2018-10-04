const user = "projectnursery";
const pass = "pnthepassword";
const paths = require("./paths/pn-paths.js");

module.exports = {
	credentials : {
		username: user,
		password: pass
	},
	paths : paths.paths,
	widths: [480, 600, 1024, 1440]
};