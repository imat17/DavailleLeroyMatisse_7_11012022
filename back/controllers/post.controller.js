const { UserModel, PostModel, CommentModel } = require('../models/Index');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.readPost = async (req, res) => {
	try {
		const allPosts = await PostModel.findAll();
		res.status(200).send(allPosts);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports.createPost = async (req, res) => {
	let fileName;
	// Vérification de l'image
	if (req.file != null) {
		try {
			if (
				req.file.detectedMimeType != 'image/jpg' &&
				req.file.detectedMimeType != 'image/png' &&
				req.file.detectedMimeType != 'image/gif' &&
				req.file.detectedMimeType != 'image/jpeg'
			)
				throw Error('Image invalide');

			if (req.file.size > 500000) throw Error('Image trop volumineuse');
		} catch (err) {
			return res.status(500).send(err);
		}
		fileName = req.body.UserId + Date.now() + '.jpg';
		// Stockage des images des posts dans le dossier front 'post'
		await pipeline(
			req.file.stream,
			fs.createWriteStream(`${__dirname}/../../front/groupomania/public/uploads/posts/${fileName}`)
		);
	}

	const newPost = PostModel.create({
		UserId: req.body.UserId,
		text: req.body.text,
		picture: req.file != null ? './uploads/posts/' + fileName : '',
	});
	try {
		const post = await newPost.save();
		return res.status(201).json(post);
	} catch (err) {
		return res.status(400).send(err);
	}
};

module.exports.updatePost = async (req, res) => {
	try {
		const updatedPost = await PostModel.update(
			{ text: req.body.text, picture: req.file },
			{ where: { id: req.params.id } }
		);
		res.status(201).send('Le post à bien été modifié');
	} catch (err) {
		res.status(500).send('Erreur lors de la modification du post');
	}
};

module.exports.deletePost = async (req, res) => {
	try {
		await PostModel.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json({ message: 'Le post à bien été supprimé' });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

// Likes / Dislikes
module.exports.likePost = (req, res) => {};

module.exports.unlikePost = (req, res) => {};

// Comments
module.exports.commentPost = async (req, res) => {
	try {
		const newComment = await CommentModel.create({
			text: req.body.text,
			PostId: req.params.id,
			commenterPseudo: req.body.commenterPseudo,
		});
		const comment = await newComment.save();
		return res.status(201).json(comment);
	} catch (err) {
		res.status(500).send('Commentaire non publié');
	}
};

module.exports.editCommentPost = async (req, res) => {
	try {
		await CommentModel.update(
			{ text: req.body.text },
			{ where: { PostId: req.params.id } }
		);
		res.status(201).send('Le commentaire à bien été modifié');
	} catch {
		res.status(500).send('Erreur lors de la modification du commentaire');
	}
};

module.exports.deleteCommentPost = async (req, res) => {
	try {
		await CommentModel.destroy({
			where: { PostId: req.params.id },
		});
		res.status(200).json({ message: 'Le commentaire à bien été supprimé' });
	} catch (err) {
		return res.status(500).json({ message: err + 'Erreur lors de la suppression du commentaire' });
	}
};
