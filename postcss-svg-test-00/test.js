const fs         = require('fse');
const postcss    = require('postcss');
const postcssSvg = require('postcss-svg');

fs.readFile('test.css', 'utf8').then(
	(sourceCSS) => postcss([
		postcssSvg()
	]).process(
		sourceCSS
	)
).then(
	(result) => Promise.all([
		fs.writeFile('test.result.css', result.css),
		fs.readFile('test.expect.css', 'utf8')
	]).then(
		(results) => result.css === results[1]
	)
).then(
	(pass) => console.log(pass ? 'pass' : 'fail') || process.exit(pass ? 0 : 1)
);
