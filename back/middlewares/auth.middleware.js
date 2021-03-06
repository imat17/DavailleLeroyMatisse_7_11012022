const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

// Vérification du token à chaque requête
module.exports.checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				// Cookie invalide >> suppression
				res.locals.user = null;
				res.cookies('jwt', '', { maxAge: 1 });
				next();
			} else {
				let user = await UserModel.findByPk(decodedToken.id);
				res.locals.user = user;
				console.log(res.locals.user);
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

// Vérification du token lors de l'authentification
module.exports.requireAuth = (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (token) {
			jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
				if (err) {
					console.log(err);
				} else {
					console.log(decodedToken.id);
					await res.json(res.locals.user.id);
					next();
				}
			});
		} else {
			console.log('pas de token');
		}
	} catch (err) {
		console.log(err);
	}
};

const getUserId = (req) => {
	const token = req.cookies.jwt;
	const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
	const UserId = decodedToken.id;
	return UserId;
}

module.exports.getUserId = getUserId;
