const { UserModel, PostModel } = require('../models/Index');
const token = require('../middlewares/auth.middleware');
const fs = require('fs');
// const { post } = require('../routes/post.routes');

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

// module.exports.updateUser = async (req, res) => {
// 	const decryptedUser = token.getUserId(req);
// 	try {
// 		const User = await UserModel.findOne({ where: { id: decryptedUser } });
// 		if (User !== null) {
// 			UserModel.findOne({
// 				where: { id: decryptedUser },
// 			}).then((user) => {
// 				if (req.file) {
// 					newProfilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
// 				}
// 				if (user.picture) {
// 					const filename = user.picture.split('/uploads/')[1];
// 					fs.unlink(`uploads/${filename}`, (err) => {
// 						if (err) console.log(err);
// 						else {
// 							res.status(200).send("L'image à bien été supprimée");
// 						}
// 					});
// 				}
// 				UserModel.update(
// 					{ pseudo: req.body.pseudo, email: req.body.email, picture: newProfilePicture },
// 					{ where: { id: req.body.id } }
// 				);
// 				then(() => res.status(200).json({ message: 'Utilisateur modifié' })).catch(() =>
// 					res.status(500).json({ error: 'Erreur serveur' })
// 				);
// 			});
// 		} else {
// 			res.status(400).json({ message: 'Utilisateur non authentifié' });
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		// res.status(500).send('Erreur lors de la modification du post');
// 	}
// };
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
