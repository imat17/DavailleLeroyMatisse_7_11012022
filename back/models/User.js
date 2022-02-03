const { bdd } = require('../config/connect');
const { DataTypes } = require('sequelize');


const User = bdd.define('User', {
	pseudo: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	picture: {
		type: DataTypes.STRING,
		default: './uploads/profil/random-user.png',
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

module.exports = User;
