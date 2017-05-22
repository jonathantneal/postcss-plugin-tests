const fs              = require('fse');
const autoprefixer    = require('autoprefixer');
const postcss         = require('postcss');
const postcssNormalize = require('postcss-normalize');

fs.readFile('test.css', 'utf8').then(
	(sourceCSS) => postcss([
		postcssNormalize(),
		autoprefixer()
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
