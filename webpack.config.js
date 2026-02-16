const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'ft-blocks-global-styles': path.resolve(
			__dirname,
			'./src/styles/index.js'
		),
		animations: path.resolve( __dirname, './src/animations/index.js' ),
		'scroll-to-element': path.resolve(
			__dirname,
			'./src/scroll-to-element/index.js'
		),
	},
	output: {
		...defaultConfig.output,
		filename: '[name].js',
	},
};
