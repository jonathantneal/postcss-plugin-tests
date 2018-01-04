const fs               = require('fse');
const postcss          = require('postcss');
const postcssVariables = require('postcss-advanced-variables');

// symbols
const isWin32 = process.platform === 'win32';
const tick    = isWin32 ? '√' : '✔';
const cross   = isWin32 ? '×' : '✖';

// test name
const testname = 'PostCSS Advanced Variables (Issue #41)';

fs.readFile('test.css', 'utf8').then(
	(sourceCSS) => postcss([
		postcssVariables({
			variables: require('./variables.json')
		})
	]).process(sourceCSS, { from: 'result.css' })
).then(
	(result) => Promise.all([
		fs.writeFile('test.result.css', result.css),
		fs.readFile('test.expect.css', 'utf8')
	]).then(
		(results) => result.css === results[1] ? true : Promise.reject('results differed')
	)
).then(
	(pass) => console.log(tick, testname, 'test passed', '\n') || process.exit(0),
	(error) => console.log(cross, testname, 'test failed', error) || process.exit(1)
);
