// var webpackConfig = require('./webpack.config.js');
// delete webpackConfig.entry

module.exports = function (config) {
	config.set({
		browsers: ['Chrome'],
		frameworks: ['jasmine'],
		// Entry file for all tests
		files: ['test/index.js'],
		// Pass the file to karma-webpack for bundling
		preprocessors: {
			'test/index.js': ['webpack']
		},
		// Avoid walls of useless text
		webpackMiddleware: {
			noInfo: true
		},
		singleRun: true,
		webpack: {
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/
					},
					{
						test: /\.vue$/,
						loader: 'vue-loader'
					},
					{
				        test: /\.(png|jpg|gif|svg)$/,
				        loader: 'file-loader',
				        options: {
				          name: '[name].[ext]?[hash]'
				        }
				    },
				]
			}
		}
	})
}