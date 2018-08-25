var Encore = require('@symfony/webpack-encore');

Encore
	// the project directory where compiled assets will be stored
	.setOutputPath('public/build/')

	// the public path used by the web server to access the previous directory
	.setPublicPath('/build')
	.cleanupOutputBeforeBuild()
	.enableSourceMaps(!Encore.isProduction())

	// uncomment to create hashed filenames (e.g. app.abc123.css)
	// .enableVersioning(Encore.isProduction())

	.addEntry('app', './assets/ts/app.tsx')
	// .addStyleEntry('scss/app', './assets/scss/app.scss')

	// enable TypeScript
	.enableTypeScriptLoader()

	// enable React
	// enableReactPreset()

	// uncomment if you use Sass/SCSS files
	.enableSassLoader()

	// show OS notifications when builds finish/fail
	.enableBuildNotifications()

	// uncomment for legacy applications that require $/jQuery as a global variable
	// .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
