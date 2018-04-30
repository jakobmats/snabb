require('../images/crossword.png');
require('../scss/app.scss');
require('font-awesome/css/font-awesome.css');

const $ = require('jquery');

$(document).ready(() => {
	$('a').on('click', function(e) {
		e.preventDefault();
		history.pushState({}, '', $(this).attr('href'));
	});
});