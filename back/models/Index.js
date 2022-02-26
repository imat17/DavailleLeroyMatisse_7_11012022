const UserModel = require('./User');
const PostModel = require('./Post');
const CommentModel = require('./Comment');
const { bdd } = require('../config/connect');

const loadModel = async () => {
	try {
		await UserModel.hasMany(PostModel, { onDelete: 'cascade' });
		await UserModel.hasMany(CommentModel, { onDelete: 'cascade' });
		await PostModel.hasMany(CommentModel, { onDelete: 'cascade' });
		await PostModel.belongsTo(UserModel);
		await CommentModel.belongsTo(UserModel);
		await bdd.sync();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { loadModel, UserModel, PostModel, CommentModel};
