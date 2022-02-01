const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

//Json Web Token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: maxAge, // 3 jours
	});
};

module.exports.signUp = async (req, res) => {
	const { pseudo, email, password } = req.body;
	try {
		const user = await UserModel.create({ pseudo, email, password });
		res.status(201).json({ user: user.id });
	} catch (err) {
		const errors = signUpErrors(err);
		res.status(400).send(err);
	}
};

module.exports.signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ where: { email: email, password: password } });
		const token = createToken(user.id);
		res.cookie('jwt', token, { httpOnly: true, maxAge });
		res.status(200).json({ user: user.id });
	} catch (err) {
		const errors = signInErrors(err);
		res.status(400).send(err);
	}
};

module.exports.logout = async (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 }); // maxAge = 1ms
	res.redirect('/');
};
