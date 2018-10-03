const user = "projectnursery";
const pass = "pnthepassword";
const paths = require("./paths/itruns-paths.js");

module.exports = {
	credentials : {
		username: user,
		password: pass
	},
	paths : paths.paths,
	url : "https://itruns.co.uk"
};