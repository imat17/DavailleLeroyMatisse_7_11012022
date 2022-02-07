const { bdd } = require('../config/connect');
const { DataTypes } = require('sequelize');

const Comment = bdd.define('Comment', {
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	commenterPseudo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Comment;
