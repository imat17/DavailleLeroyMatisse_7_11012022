const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const { connect } = require('./config/connect');
const { loadModel } = require('./models/Index');
const { checkUser, requireAuth } = require('./middlewares/auth.middleware');
const cors = require('cors');
const path = require('path');

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// jwt à chaque requête
app.get('*', checkUser);
// Si token présent lors de l'authentification
app.get('/jwtid', requireAuth);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
