/* BUILDING AN ORM */

var pg = require('pg');
var dbUrl = "pg://localhost/wiki_db";
//var dbUrl = process.env.DATABASE_URL;

module.exports = {
	end: function(){
		pg.end();
	},
	all: function(table, cb){
		pg.connect(dbUrl, function (err, client, done){
			client.query('SELECT * FROM ' + table, function (err, result){
				if (err) {throw err};
				done();
				cb(result.rows);
			});
		});
		this.end();
	},
	find: function(table, id, cb){
		pg.connect(dbUrl, function (err, client, done){
			if (err) {throw err};

			var query = 'SELECT * FROM ' + table + ' WHERE id=' + id;
				console.log(query);

			client.query(query, function (err, result){
				if (err) {throw err};
				done();
				cb(result.rows)
			});
		});
		this.end();
	},
	findRelations: function (table, column, id, cb){
		pg.connect(dbUrl, function (err, client, done){
			if (err) {throw err};

			client.query('SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id, function (err, result){
				if (err) {throw err};
				done();
				cb(result.rows);
			});
		});
		this.end();
	},
	delete: function (table, id, cb){
		pg.connect(dbUrl, function (err, client, done){
			if (err) {throw err};
			client.query('DELETE FROM ' + table + ' WHERE id=' + id, function (err, result){
				if (err) {throw err};
				done();
				cb(result);
			});
		});
		this.end();
	},
	create: function (table, obj, cb){
		pg.connect(dbUrl, function (err, client, done){
			if (err) {throw err};
			var columns = [];
			var values = [];
			var dollars = [];
			Object.keys(obj).forEach(function(key, i){
				columns.push(key);
				values.push(obj[columns[i]]);
				dollars.push('$' + (i+1));
			});
			var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ') VALUES (' + dollars.join(', ') + ') RETURNING id AS id';
			client.query(query, values, function (err, result){
				if (err) {throw err};
				done();
				cb(result.rows[0]);
			});
		})
		this.end();
	},
	update: function (table, obj, id, cb) {
		if (err) {throw err};
        pg.connect(dbUrl, function (err, client, done) {
            var columns = [];
            var set     = [];
            var values  = [];
            Object.keys(obj).forEach(function (key, i) {
                columns.push(key);
                set.push(key + '=($' + (i + 1) + ')');
                values.push(obj[columns[i]]);
            });
            client.query('UPDATE ' + table + ' SET ' + set.join(', ') + ' WHERE id = ' + id, values, function (err, result) {
            	if (err) {throw err};
                done();
                cb(result);
            });
        });
        this.end();
    },
    getUser: function (string, cb){
    	if (err) {throw err};
    	pg.connect(dbUrl, function (err, client, done){
    		if (err) {throw err};
    		var query = 'SELECT * FROM users WHERE email = ($1)';
    		client.query(query, [string], function (err, result){
    			if (err) {throw err};
    			done();
    			cb(result.rows[0]);
    		})
    	})
    	this.end();
    },
    findMine: function(id, cb){
    	if (err) {throw err};
		pg.connect(dbUrl, function (err, client, done){
			if (err) {throw err};

			var query = 'SELECT * FROM articles WHERE creation_user =' + id;
				console.log(query);

			client.query(query, function (err, result){
				if (err) {throw err};
				done();
				cb(result.rows)
			});
		});
		this.end();
	},
    findSearch: function(string, cb){
    	if (err) {throw err};
		pg.connect(dbUrl, function (err, client, done){
			if (err) {throw err};

			var query = 'SELECT * FROM articles WHERE title LIKE %($1)% OR content LIKE %($1)%';
				console.log(query);

			client.query(query, [string], function (err, result){
				if (err) {throw err};
				done();
				cb(result.rows)
			});
		});
		this.end();
	}

};


