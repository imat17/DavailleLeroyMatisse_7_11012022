const { UserModel, PostModel, CommentModel, LikeModel } = require('../models/Index');
const fs = require('fs');
const token = require('../middlewares/auth.middleware');

module.exports.readPost = async (req, res) => {
	try {
		const allPosts = await PostModel.findAll({
			include: [
				{ model: UserModel, attributes: { exclude: ['password', 'isAdmin'] } },
				{
					model: CommentModel,
					attributes: { exclude: ['password', 'isAdmin'] },
					include: UserModel,
					attributes: { exclude: ['password', 'isAdmin'] },
				},
			],
			order: [['createdAt', 'DESC']],
		});
		res.status(200).send(allPosts);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports.createPost = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	try {
		const User = await UserModel.findOne({ where: { id: decryptedUser } });
		if (User !== null) {
			if (req.file) {
				imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
			} else {
				imageUrl = '';
			}
			const newPost = PostModel.create({
				UserId: User.id,
				text: req.body.text,
				picture: imageUrl,
			});
			try {
				const post = await newPost.save();
				return res.status(201).json(post);
			} catch (err) {
				return res.status(500).send(err);
			}
		} else {
			res.status(400).send({ message: 'Utilisateur non authentifié' });
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports.updatePost = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	let newPost = await PostModel.findOne({ where: { id: req.params.id } });
	if (decryptedUser === newPost.UserId) {
		try {
			if (req.file) {
				newPicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
			}
			if (PostModel.picture) {
				const filename = PostModel.picture.split('/uploads')[1];
				fs.unlink(`uploads/${filename}`, (err) => {
					if (err) console.log(err);
					else {
						res.status(200).send("L'image à bien été supprimée");
					}
				});
			}
			PostModel.update(
				{
					text: newText,
					picture: newPicture,
					UserId: req.body.UserId,
				},
				{ where: { id: req.params.id } }
			);
			res.status(201).send('Le post à bien été modifié');
		} catch (err) {
			res.status(500).send('Erreur lors de la modification du post');
		}
	} else {
		res.status(400).json({ message: 'Utilisateur non authentifié' });
	}
};

// module.exports.updatePost = async (req, res) => {
// 	try {
// 		let newPicture;
// 		const decryptedUser = token.getUserId(req);
// 		let newPost = await PostModel.findOne({ where: { id: req.params.id } });
// 		if (decryptedUser === newPost.UserId) {
// 			if (req.file) {
// 				newPicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
// 				if (PostModel.picture) {
// 					const filename = PostModel.split('/upload')[1];
// 					fs.unlink(`uploads/${filename}`, (err) => {
// 						if (err) console.log(err);
// 						else {
// 							console.log('Image supprimée');
// 						}
// 					});
// 				}
// 			}
// 			if (req.body.text) {
// 				PostModel.text = req.body.text;
// 			}
// 			PostModel.UserId = req.body.UserId;
// 			PostModel.picture = newPicture;
// 			const newPost = await PostModel.save({
// 				fields: ['text', 'picture'],
// 			});
// 			res.status(200).json({ newPost: newPost, messageRetour: 'post modifié' });
// 		} else {
// 			res.status(400).json({ message: "Vous n'avez pas les droits requis" });
// 		}
// 	} catch (err) {
// 		return res.status(500).send({ error: 'Erreur serveur' });
// 	}
// };

module.exports.deletePost = async (req, res) => {
	try {
		const decryptedUser = token.getUserId(req);
		const isAdmin = await UserModel.findOne({ where: { id: decryptedUser } });
		let deletePost = await PostModel.findOne({ where: { id: req.params.id } });
		if (decryptedUser === deletePost.UserId || isAdmin.isAdmin === true) {
			if (PostModel.picture) {
				const filename = PostModel.picture.split('/uploads')[1];
				fs.unlink(`uploads/${filename}`, () => {
					PostModel.destroy({
						where: { id: req.params.id },
					});
				});
			} else {
				PostModel.destroy({ where: { id: req.params.id } });
				res.status(200).json({ message: 'Post supprimé' });
			}
		} else {
			res.status(400).json({ message: 'Utilisateur non authentifié' });
		}
	} catch (err) {
		res.status(500).send('Erreur lors de la modification du post');
	}
};

// Comments
module.exports.commentPost = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	try {
		const User = await UserModel.findOne({ where: { id: decryptedUser } });
		if (User !== null) {
			try {
				const newComment = await CommentModel.create({
					text: req.body.text,
					PostId: req.params.id,
					commenterPseudo: req.body.commenterPseudo,
					UserId: req.body.UserId,
				});
				const comment = await newComment.save();
				return res.status(201).json(comment);
			} catch (err) {
				res.status(500).send('Commentaire non publié');
			}
		} else {
			res.status(400).send({ message: 'Utilisateur non authentifié' });
		}
	} catch {
		res.status(500).send(err);
	}
};

module.exports.editCommentPost = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	let comment = await CommentModel.findOne({ where: { id: req.params.id } });
	if (decryptedUser === comment.UserId) {
		try {
			await CommentModel.update({ text: req.body.text }, { where: { id: req.params.id } });
			res.status(201).send('Le commentaire à bien été modifié');
		} catch {
			res.status(500).send('Erreur lors de la modification du commentaire');
		}
	} else {
		res.status(400).json({ message: 'Utilisateur non authentifié' });
	}
};

module.exports.deleteCommentPost = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	const isAdmin = await UserModel.findOne({ where: { id: decryptedUser } });
	let comment = await CommentModel.findOne({ where: { id: req.params.id } });
	if (decryptedUser === comment.UserId || isAdmin.isAdmin === true) {
		try {
			await CommentModel.destroy({
				where: { id: req.params.id },
			});
			res.status(200).json({ message: 'Le commentaire à bien été supprimé' });
		} catch (err) {
			return res
				.status(500)
				.json({ message: err + 'Erreur lors de la suppression du commentaire' });
		}
	} else {
		res.status(400).json({ message: 'Utilisateur non authentifié' });
	}
};

// Likes / Unlikes
module.exports.likePost = async (req, res) => {
	try {
		await LikeModel.create({
			PostId: req.params.id,
			UserId: req.body.UserId,
		});
		return res.status(201).send('Commentaire liké');
	} catch (err) {
		res.status(500).send('Erreur lors du like');
	}
};

module.exports.unlikePost = async (req, res) => {
	try {
		await LikeModel.destroy({
			where: { UserId: req.body.UserId },
		});
		res.status(201).send('Like annulé');
	} catch {
		res.status(500).send('Erreur lors de la suppression du like');
	}
};
