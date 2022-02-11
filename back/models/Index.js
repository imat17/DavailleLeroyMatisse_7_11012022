const UserModel = require('./User');
const PostModel = require('./Post');
const CommentModel = require('./Comment');
const LikeModel = require('./Like');
const { bdd } = require('../config/connect');

const loadModel = async () => {
	try {
		await UserModel.hasMany(PostModel, { onDelete: 'cascade' });
		await UserModel.hasMany(LikeModel, { onDelete: 'cascade' });
		await UserModel.hasMany(CommentModel, { onDelete: 'cascade' });
		await PostModel.hasMany(CommentModel, { onDelete: 'cascade' });
		await PostModel.belongsTo(UserModel);
		await PostModel.hasMany(LikeModel, { onDelete: 'cascade' });
		await bdd.sync();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { loadModel, UserModel, PostModel, CommentModel, LikeModel };
