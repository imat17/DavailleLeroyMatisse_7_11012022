const { UserModel, PostModel, CommentModel, LikeModel } = require('../models/Index');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const token = require('../middlewares/auth.middleware');
const { post } = require('../routes/post.routes');

module.exports.readPost = async (req, res) => {
	try {
		const allPosts = await PostModel.findAll({
			include: [{ model: UserModel }, { model: CommentModel, include: UserModel }],
		});
		res.status(200).send(allPosts);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports.createPost = async (req, res) => {
	let fileName;
	const decryptedUser = token.getUserId(req);
	try {
		const User = await UserModel.findOne({ where: { id: decryptedUser } });
		if (User !== null) {
			if (req.file != null) {
				try {
					if (
						req.file.detectedMimeType != 'image/jpg' &&
						req.file.detectedMimeType != 'image/png' &&
						req.file.detectedMimeType != 'image/jpeg' &&
						req.file.detectedMimeType != 'image/gif'
					)
						throw Error('image invalide');
					if (req.file.size > 500000) throw Error('Image trop volumineuse');
				} catch (err) {
					return res.status(500).send(err);
				}
				if (
					req.file.detectedMimeType == 'image/jpg' ||
					req.file.detectedMimeType == 'image/png' ||
					req.file.detectedMimeType == 'image/jpeg'
				) {
					fileName = req.body.UserId + Date.now() + '.jpg';
				} else if (req.file.detectedMimeType == 'image/gif') {
					fileName = req.body.UserId + Date.now() + '.gif';
				}
				// Stockage des images des posts dans le dossier front 'post'
				await pipeline(
					req.file.stream,
					fs.createWriteStream(
						`${__dirname}/../../front/groupomania/public/uploads/posts/${fileName}`
					)
				);
			}
			const newPost = PostModel.create({
				UserId: User.id,
				text: req.body.text,
				picture: req.file != null ? './uploads/posts/' + fileName : '',
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
			await PostModel.update({ text: req.body.text }, { where: { id: req.params.id } });
			res.status(201).send('Le post à bien été modifié');
		} catch (err) {
			res.status(500).send('Erreur lors de la modification du post');
		}
	} else {
		res.status(400).json({ message: 'Utilisateur non authentifié' });
	}
};

module.exports.deletePost = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	let deletePost = await PostModel.findOne({ where: { id: req.params.id } });
	if (decryptedUser === deletePost.UserId) {
		try {
			if (PostModel.picture) {
				const fileName = PostModel.picture.split('/posts')[1];
				fs.unlink(`posts/${fileName}`, () => {
					PostModel.destroy({
						where: { id: req.params.id },
					});
				});
			} else {
				PostModel.destroy({ where: { id: req.params.id } });
				res.status(200).json({ message: 'Post supprimé' });
			}
		} catch (err) {
			return res.status(500).send({ err: 'Erreur serveur' });
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

// Comments
module.exports.commentPost = async (req, res) => {
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
};

module.exports.editCommentPost = async (req, res) => {
	try {
		await CommentModel.update({ text: req.body.text }, { where: { id: req.params.id } });
		res.status(201).send('Le commentaire à bien été modifié');
	} catch {
		res.status(500).send('Erreur lors de la modification du commentaire');
	}
};

module.exports.deleteCommentPost = async (req, res) => {
	try {
		await CommentModel.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json({ message: 'Le commentaire à bien été supprimé' });
	} catch (err) {
		return res.status(500).json({ message: err + 'Erreur lors de la suppression du commentaire' });
	}
};
