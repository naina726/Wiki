DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
);

CREATE TABLE categories(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE articles(
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	content TEXT,
	cat_id INTEGER references categories,
	creation_date DATE NOT NULL default CURRENT_DATE,
	creation_user INTEGER references users
);

