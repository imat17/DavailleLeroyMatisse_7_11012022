const { bdd } = require('../config/connect');
const { DataTypes } = require('sequelize');
// const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

// cryptage du mot de passe avant de save dans la bdd
User.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

module.exports = User;