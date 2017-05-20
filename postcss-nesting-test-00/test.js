const fs             = require('fse');
const cssnano        = require('cssnano');
const postcss        = require('postcss');
const postcssApply   = require('postcss-apply');
const postcssImport  = require('postcss-import');
const postcssNesting = require('postcss-nesting');

fs.readFile('test.css', 'utf8').then(
	(sourceCSS) => postcss([
		postcssImport(),
		postcssApply(),
		postcssNesting()
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
