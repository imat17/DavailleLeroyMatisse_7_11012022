const User = require('./User');
const Post = require('./Post');
const { bdd } = require('../config/connect');

const loadModel = async () => {
	try {
		await User.hasMany(Post);
		await bdd.sync();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {loadModel, User, Post};
