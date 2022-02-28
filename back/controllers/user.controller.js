const { UserModel, PostModel } = require('../models/Index');
const token = require('../middlewares/auth.middleware');

module.exports.getAllUsers = async (req, res) => {
	const users = await UserModel.findAll({
		attributes: { exclude: ['password', 'isAdmin'] },
	});
	res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
	const user = await UserModel.findOne({
		where: { id: req.params.id },
		attributes: { exclude: ['password'] },
	});
	res.status(200).json(user);
};

module.exports.updateUser = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	try {
		const User = await UserModel.findOne({ where: { id: decryptedUser } });
		if (User !== null) {
			try {
				const updatedUser = await UserModel.update(
					{ pseudo: req.body.pseudo, email: req.body.email },
					{ where: { id: req.params.id } }
				);
				res.status(200).json(updatedUser);
			} catch (err) {
				res.status(500).send('Erreur');
			}
		} else {
			res.status(400).send({ message: 'Vous ne possédez pas les droits requis' });
		}
	} catch {
		res.status(500).send(err);
	}
};

module.exports.deleteUser = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	try {
		const User = await UserModel.findOne({ where: { id: decryptedUser } });
		if (User !== null) {
			try {
				await UserModel.destroy({
					where: { id: req.params.id },
				});

				await PostModel.destroy({
					where: { UserId: req.params.id },
				});
				res.cookie('jwt', '', { maxAge: 1 }); // maxAge = 1ms
				res.status(200).json({ message: `L'utilisateur à bien été supprimé` });
			} catch (err) {
				return res.status(500).json({ message: err });
			}
		} else {
			res.status(400).send({ message: 'Vous ne possédez pas les droits requis' });
		}
	} catch {
		res.status(500).send(err);
	}
};