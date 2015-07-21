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

	app.get('/articles/new', function (req, res) {
	  	res.render('articleNew');
	});

	app.get('/search', function (req, res) {
		db.findSearch('articles', req.body, function (data) {
    		var articles = {
				articles: data
			};
		console.log(articles);
		res.render('searchResults', articles);
	    });
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
	
	app.post("/articles", function (req, res) { 
		console.log(req.body);
		console.log(req.body.optionMenu);
		db.create('articles', req.body, function (data) {
  			res.redirect('/home');
 		});
	});


	app.get('/articles/edit/:id', function (req, res) {
  		db.find('articles', req.params.id, function (articles) {
    		var data = {
      			articles: articles
    	}
    	console.log(data)
    	res.render('articleEdit', articles[0]);
  		});
	});

	app.put("/articles/:id", function (req, res) {
 		db.update('articles', req.body, req.params.id, function (data) {
   			res.redirect('/articles/' + req.params.id)
 		});
	});

	app.delete("/articles/:id", function (req, res) {
 		db.delete('articles', req.params.id, function (data) {
  			res.redirect('/home');
 		});
	})




}


