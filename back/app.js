const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const path = require('path');
const { connect } = require('./config/connect');
const { loadModel } = require('./models/Index');
const { checkUser, requireAuth } = require('./middlewares/auth.middleware');
const cors = require('cors');

// Connection à la BDD
connect();

loadModel();

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// jwt à chaque requête
app.get('*', checkUser);
// Si token présent lors de l'authentification
app.get('/jwtid', requireAuth, (req, res) => {
	res.status(200).send(res.locals.user._id);
});

// Routes
app.use('/api/user', userRoutes);

module.exports = app;