const Differencify = require('differencify');
const differencify = new Differencify();

async function testPath(url, path, credentials = false) {
	const target = differencify.init({ chain: false });
	await target.launch();
	const page = await target.newPage();
	await page.setViewport({ width: 1600, height: 1200 });
	if (credentials) {
		await page.authenticate(credentials);
	}
	await page.goto(url + path.endpoint);
	await page.waitFor(1000);
	const image = await page.screenshot();
	await target.toMatchSnapshot(image)
	await page.close();
	await target.close();
}

module.exports = {
	testAllPaths : async function(url, paths, credentials){
		for (var i = 0; i < paths.length; i++){
			var path = paths[i];
			console.log("Capturing: " + path.name);
			await testPath(url, path, credentials);
		}
		console.log("Tests Complete");
	}
};