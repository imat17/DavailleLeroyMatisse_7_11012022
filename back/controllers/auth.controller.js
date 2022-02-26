const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Json Web Token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: maxAge, // 1 jour
	});
};

module.exports.signUp = async (req, res) => {
	const { pseudo, email, password } = req.body;
	try {
		const hash = await bcrypt.hash(password, 10);
		const user = await UserModel.create({ pseudo, email, password: hash });
		res.status(201).json({ user: user.id });
	} catch (err) {
		res.status(200).json({ message: `Ce pseudo ou email existe déjà` });
	}
};

module.exports.signIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ where: { email: email } });
		if (user) {
			const validPassword = await bcrypt.compare(password, user.password);
			if (validPassword) {
				const token = createToken(user.id);
				res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge });
				res.status(200).json({ user: user.id });
			} else {
				res.status(200).json({ message: 'Mot de passe incorrect' });
			}
		} else {
			res.status(200).json({ message: `Email introuvable` });
		}
	} catch (err) {
		res.status(500);
	}
};

module.exports.logout = async (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 }); // maxAge = 1ms
	res.redirect('/');
};
