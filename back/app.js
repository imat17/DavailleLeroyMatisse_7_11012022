const express = require('express');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize');

// Connection à la BDD
require('dotenv').config();

const URI = `${process.env.DIALECT}://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}
:${process.env.PORT}/${process.env.DATABASE}`;

const sequelize = new Sequelize(URI);

try {
	sequelize.authenticate();
	console.log('Connecté à la base de données MySQL!');
} catch (error) {
	console.error('Impossible de se connecter, erreur suivante :', error);
}

// Autorisations CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

module.exports = app;
