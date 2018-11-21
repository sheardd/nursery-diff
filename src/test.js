const Differencify = require('differencify');
const differencify = new Differencify();

async function testPath(url, path, pathsNum, index, credentials = false, widths = false) {
	const browser = differencify.init({ testName: path.name,
									chain: false });
	if (widths) {
		for (var i = 0; i < widths.length; i++) {
			console.log("Capture Number " + ((index * widths.length) + i - 3) +
				" of " + (pathsNum * widths.length));
			await capture(browser, url, path, width = widths[i], credentials);
		}
	} else {
			console.log("Capture Number " + index + " of " + pathsNum);
		await capture(browser, url, path, pathsNum, width = 1440, 1, credentials);
	}
	console.log();
	console.log("==========================");
	console.log();
	await browser.close();

	return;
}

async function capture(browser, url, path, width, credentials = false){
	console.log("Capturing " + path.name + " at " + url + " at " + width + "px");
	const page = await browser.newPage();
	const viewport = Object.assign(page.viewport(), {width: width});
	await page.setViewport(viewport);
	await page.setCacheEnabled(false);
	if (credentials) {
		await page.authenticate(credentials);
	}
	if (path.options) {
		console.log('Path "' + path.name + '" has options');
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
	await page.waitFor(5000);
	const image = await page.screenshot({fullPage: true});
	await browser.toMatchSnapshot(image, (results) => {
		console.log("Result:");
		console.log(results.testResult);
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
			await testPath(url, path, paths.length, (i+1), credentials, widths);
		}
		await differencify.cleanup();
		console.log("Tests Complete");
		return;
	}
};