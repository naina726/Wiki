'use strict';
var db     = require('../db.js');
var bcrypt = require('bcrypt');

module.exports.controller = function(app){
	//ALL USER ROUTES
	//sign up
	app.get('/signup', function (req, res){
		console.log(app);
		res.render('signupForm');
	});

	app.get('/account', function (req, res){
		db.findMine(req.session.currentUser, function (data){
			var articles = {
				articles: data
			};
			console.log(articles);
			res.render('account', articles);
	    });
	});


	app.post('/signup', function (req, res){
		bcrypt.hash(req.body.password, 10, function (err, hash){
			var newUser = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: hash
			};
			db.create('users', newUser, function (user){
				req.session.currentUser = user.id;
				res.redirect('/home');
			});
		});
	});
	//log in
	app.get('/login', function (req, res){
		res.render('loginForm')
	})

	app.post('/login', function (req, res){
		db.getUser(req.body.email, function(user){
			bcrypt.compare(req.body.password, user.password, function (err, result){
				if(result){
					req.session.currentUser = user.id;
					console.log(req.session)
					res.redirect('/home');
				}
				else{
					res.redirect('/login');
				}
			});
		});
	});
	//logout
	app.delete('/logout', function (req, res){
		req.session.currentUser = null;
		res.redirect('/');
	})


}