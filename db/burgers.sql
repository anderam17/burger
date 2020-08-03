DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    devoured BOOLEAN,
	PRIMARY KEY (id)
);

INSERT INTO burgers (name) VALUES ('Bacon Cheese Burger');
INSERT INTO burgers (name) VALUES ('Turkey Burger');


SELECT * FROM burgers;