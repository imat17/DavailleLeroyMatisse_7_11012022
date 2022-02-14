const { UserModel, PostModel, CommentModel, LikeModel } = require('../models/Index');

module.exports.getAllUsers = async (req, res) => {
	const users = await UserModel.findAll({
		attributes: { exclude: ['password', 'isAdmin'] },
	});
	res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
	const user = await UserModel.findOne({
		where: { id: req.params.id },
		attributes: { exclude: ['password', 'isAdmin'] },
	});
	res.status(200).json(user);
};

module.exports.updateUser = async (req, res) => {
	// Gestion err,docs à revoir
	try {
		const updatedUser = await UserModel.update(
			{ pseudo: req.body.pseudo, email: req.body.email },
			{ where: { id: req.params.id } }
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).send('Erreur');
	}
};

module.exports.deleteUser = async (req, res) => {
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
};
