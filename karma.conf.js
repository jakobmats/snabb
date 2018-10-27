// Load and configure Encore
const Encore = require('@symfony/webpack-encore');
Encore.configureRuntimeEnvironment('dev');

// Load the Webpack config
const webpackConfig = require('./webpack.config.js');

// Remove the entry property (this is handled by Karma)
delete webpackConfig.entry;

module.exports = config => {
	config.set({
		basePath: 'assets',
		frameworks: ['mocha', 'chai'],
		files: ['js/tests/**/*.js'],
		exclude: [],
		preprocessors: {'js/tests/**/*.js': ['webpack']},
		webpack: webpackConfig,
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['Chrome', 'Firefox'],
		singleRun: true,
		concurrency: Infinity
	});
};