'use strict';

var db = require('../db.js');

module.exports.controller = function(app){


	app.get('/home', function (req, res){
		db.all('articles', function (data){
			var articles = {
				articles: data
			};
			res.render('home', articles)
		});
	});

///not done
	app.get('/articles/new', function (req, res) {
	  	res.render('articleNew');
	});


	app.get('/articles/:id', function (req, res) {
	  db.find('articles', req.params.id, function (data) {
    	var articles = {
			articles: data[0]
		};
		console.log(articles);
		res.render('articleShow', articles);
	    });
	});
}
