const UserModel = require('./User');
const PostModel = require('./Post');
const CommentModel = require('./Comment');
const LikeModel = require('./Like');
const { bdd } = require('../config/connect');

const loadModel = async () => {
	try {
		await UserModel.hasMany(PostModel);
		await UserModel.hasMany(LikeModel);
		await UserModel.hasMany(CommentModel);
		await PostModel.hasMany(CommentModel);
		await PostModel.hasMany(LikeModel);
		await bdd.sync();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { loadModel, UserModel, PostModel, CommentModel, LikeModel };
