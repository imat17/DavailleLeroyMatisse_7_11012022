const { UserModel, PostModel } = require('../models/Index');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.readPost = (req, res) => {
	PostModel.findAll({ include: UserModel });
};

module.exports.createPost = (req, res) => {};

module.exports.updatePost = (req, res) => {};

module.exports.deletePost = (req, res) => {};

// Likes / Dislikes
module.exports.likePost = (req, res) => {};

module.exports.unlikePost = (req, res) => {};

// Comments
module.exports.commentPost = (req, res) => {};

module.exports.editCommentPost = (req, res) => {};

module.exports.deleteCommentPost = (req, res) => {};
