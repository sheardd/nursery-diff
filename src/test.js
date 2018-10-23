const Differencify = require('differencify');
const differencify = new Differencify();

async function testPath(url, path, credentials = false, widths = false) {
	const browser = differencify.init({ testName: path.name,
									chain: false });
	if (widths) {
		for (var i = 0; i < widths.length; i++) {
			await capture(browser, url, path, width = widths[i], credentials);
		}
	} else {
		await capture(browser, url, path, width = 1440, credentials);
	}
	
	await browser.close();

	return;
}

async function capture(browser, url, path, width, credentials = false){
	console.log("Capturing at " + width + "px");
	const page = await browser.newPage();
	const viewport = Object.assign(page.viewport(), {width: width});
	await page.setViewport(viewport);
	if (credentials) {
		await page.authenticate(credentials);
	}
	if (path.options) {
		console.log("path has options");
		try {
			await page.goto(url + path.endpoint, path.options)
		} catch(error) {
			console.log("Capture Error:");
			console.log("---- " + error);
			return;
		}
	} else {
		await page.goto(url + path.endpoint);
	}
	await page.waitFor(1000);
	const image = await page.screenshot({fullPage: true});
	await browser.toMatchSnapshot(image, (results) => {
		console.log(results);
	});
	await page.close();
}

module.exports = {
	testAllPaths : async function(url, paths, credentials, widths = false){
		await differencify.launchBrowser();
		if (widths) {
			widths.sort((a, b) => (a - b));
		}
		for (var i = 0; i < paths.length; i++){
			var path = paths[i];
			console.log("Capturing: " + path.name);
			await testPath(url, path, credentials, widths);
		}
		await differencify.cleanup();
		console.log("Tests Complete");
		return;
	}
};