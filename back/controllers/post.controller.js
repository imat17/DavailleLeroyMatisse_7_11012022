const { UserModel, PostModel, CommentModel } = require('../models/Index');
const fs = require('fs');
const token = require('../middlewares/auth.middleware');

module.exports.readPost = async (req, res) => {
	try {
		const allPosts = await PostModel.findAll({
			include: [
				{ model: UserModel, attributes: { exclude: ['password', 'isAdmin'] } },
				{
					model: CommentModel,
					include: { model: UserModel, attributes: ['id', 'picture', 'pseudo'] },
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
			const newPost = await PostModel.create({
				UserId: User.id,
				text: req.body.text,
				picture: imageUrl,
			});
			const allPosts = await PostModel.findAll({
				include: [
					{ model: UserModel, attributes: { exclude: ['password', 'isAdmin'] } },
					{
						model: CommentModel,
						include: { model: UserModel, attributes: ['id', 'picture', 'pseudo'] },
					},
				],
				order: [['createdAt', 'DESC']],
			});
			res.status(200).send(allPosts);
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
			PostModel.findOne({
				where: { id: req.params.id },
			})
				.then((post) => {
					if (req.file) {
						let newPicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
						if (req.file && post.picture) {
							const filename = post.picture.split('/uploads/')[1];
							fs.unlink(`uploads/${filename}`, (err) => {
								if (err) console.log(err);
							});
						}
						PostModel.update(
							{
								text: req.body.text,
								picture: newPicture,
								UserId: req.body.UserId,
							},
							{ where: { id: req.params.id } }
						);
					} else {
						newPicture = null;
						PostModel.update(
							{
								text: req.body.text,
								UserId: req.body.UserId,
							},
							{ where: { id: req.params.id } }
						);
					}
				})
				.then(() => res.status(200).json({ message: 'Post modifié' }))
				.catch((err) => console.log(err));
		} catch (err) {
			res.status(500).send('Erreur lors de la modification du post');
		}
	}
};

module.exports.deletePost = async (req, res) => {
	try {
		const decryptedUser = token.getUserId(req);
		const isAdmin = await UserModel.findOne({ where: { id: decryptedUser } });
		let deletePost = await PostModel.findOne({ where: { id: req.params.id } });
		if (decryptedUser === deletePost.UserId || isAdmin.isAdmin === true) {
			PostModel.findOne({
				where: { id: req.params.id },
			}).then((post) => {
				if (post.picture) {
					const filename = post.picture.split('/uploads/')[1];
					fs.unlink(`uploads/${filename}`, () => {
						PostModel.destroy({
							where: { id: req.params.id },
						})
							.then(() => res.status(200).json({ message: 'Post supprimé' }))
							.catch(() => res.status(500).json({ error: 'Erreur serveur' }));
					});
				} else {
					PostModel.destroy({ where: { id: req.params.id } });
					res.status(200).json({ message: 'Post supprimé' });
				}
			});
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
				let currentPost = await PostModel.findOne({
					include: [
						{ model: UserModel, attributes: { exclude: ['password', 'isAdmin'] } },
						{
							model: CommentModel,
							include: { model: UserModel, attributes: ['id', 'picture', 'pseudo'] },
						},
					],
					order: [['createdAt', 'DESC']],
					where: { id: req.params.id },
				});
				res.status(201).json(currentPost);
			} catch (err) {
				res.status(500).send(`Erreur lors de l'ajout du commentaire`);
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
			console.log(comment);
			let currentPost = await PostModel.findOne({
				include: [
					{ model: UserModel, attributes: { exclude: ['password', 'isAdmin'] } },
					{
						model: CommentModel,
						include: { model: UserModel, attributes: ['id', 'picture', 'pseudo'] },
					},
				],
				order: [['createdAt', 'DESC']],
				where: { id: comment.PostId },
			});
			res.status(200).json(currentPost);
		} catch (err) {
			return res
				.status(500)
				.json({ message: err + 'Erreur lors de la suppression du commentaire' });
		}
	} else {
		res.status(400).json({ message: 'Utilisateur non authentifié' });
	}
};