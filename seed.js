var db = require('./db.js');


/*
wiki_db=# SELECT * from categories;
 id |  name  
----+--------
  1 | home
  2 | family
  3 | social
  4 | school
  5 | work
  */



var newUser = {
	first_name: 'Naina',
	last_name: 'Prasad',
	email: 'prasad.naina@gmail.com',
	password: '$2a$10$Q3.Y3JkVFztum6aPCIYK/.wYdirs8kHHRIUFSIzOdP/0PKkjPDLgu'
};

db.create('users', newUser, function (user){
	var postOne = {
		title: "call mom",
		content: "did u call mom",
		cat_id: 1,
		creation_user: user.id
	}
	var postTwo = {
		title: "call Dom",
		content: "did u call Dom",
		cat_id: 3,
		creation_user: user.id
	}
	db.create('articles', postOne, function (articles){});
	db.create('articles', postTwo, function (articles){});
});
