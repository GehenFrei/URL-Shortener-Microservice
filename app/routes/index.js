'use strict';

var path = process.cwd();

var UrlHandler = require(path + '/app/controllers/urlHandler.server.js');

module.exports = function (app) {

	var urlHandler = new UrlHandler();
	
	app.route("/new/*")
	.get(urlHandler.setShortUrl);
	
	app.route('/:urlNumber')
		.get(urlHandler.findUrl);
		
	app.route("/")
		.get(function(req, res) {
			res.render('index', {"baseUrl": process.env.APP_URL});
		});
		
};
