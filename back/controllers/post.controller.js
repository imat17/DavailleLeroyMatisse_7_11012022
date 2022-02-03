const { UserModel, PostModel } = require('../models/Index');
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

module.exports.createPost = async (req, res) => {};

module.exports.updatePost = (req, res) => {};

module.exports.deletePost = (req, res) => {};

// Likes / Dislikes
module.exports.likePost = (req, res) => {};

module.exports.unlikePost = (req, res) => {};

// Comments
module.exports.commentPost = (req, res) => {};

module.exports.editCommentPost = (req, res) => {};

module.exports.deleteCommentPost = (req, res) => {};
