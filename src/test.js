const Differencify = require('differencify');
const differencify = new Differencify();

async function testPath(url, path, credentials = false) {
	const browser = differencify.init({ chain: false });
	await browser.launch();
	const page = await browser.newPage();
	await page.setViewport({ width: 1600, height: 1200 });
	if (credentials) {
		await page.authenticate(credentials);
	}
	await page.goto(url + path.endpoint);
	await page.waitFor(1000);
	const image = await page.screenshot();
	await browser.toMatchSnapshot(image, (results) => {
		console.log(results);
	});
	await page.close();
	await browser.close();

	return;
}

module.exports = {
	testAllPaths : async function(url, paths, credentials){
		for (var i = 0; i < paths.length; i++){
			var path = paths[i];
			console.log("Capturing: " + path.name);
			await testPath(url, path, credentials);
		}
		console.log("Tests Complete");
		return;
	}
};