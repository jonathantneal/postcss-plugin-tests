const fs      = require('fse');
const postcss = require('postcss');
const plugin  = require('postcss-custom-properties');

// symbols
const isWin32 = process.platform === 'win32';
const tick    = isWin32 ? '√' : '✔';
const cross   = isWin32 ? '×' : '✖';

// test name
const testname = 'PostCSS Custom Properties (Issue #86)';

const sourceFile = 'test.css';
const expectFile = 'test.expect.css';
const resultFile = 'test.result.css';

fs.readFile(sourceFile, 'utf8').then(
	sourceCSS => postcss([
		plugin()
	]).process(sourceCSS, { to: resultFile, from: sourceFile })
).then(
	result => Promise.all([
		fs.writeFile(resultFile, result.css),
		fs.readFile(expectFile, 'utf8')
	]).then(
		results => result.css === results[1] ? true : Promise.reject('results differed')
	)
).then(
	pass => {
		console.log(tick, testname, 'test passed');
		process.exit(0);
	},
	error => {
		console.log(cross, testname, 'test failed', error);
		process.exit(1);
	}
);
