const { bdd } = require('../config/connect');
const { DataTypes, TEXT } = require('sequelize');

const Post = bdd.define('Post', {
	text: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	picture: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

module.exports = Post;
