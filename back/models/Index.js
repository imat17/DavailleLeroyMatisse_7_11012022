const UserModel = require('./User');
const PostModel = require('./Post');
const { bdd } = require('../config/connect');

const loadModel = async () => {
	try {
		await UserModel.hasMany(PostModel);
		await bdd.sync();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { loadModel, UserModel, PostModel };
