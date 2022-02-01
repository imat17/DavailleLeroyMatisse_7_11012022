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
		// Hash du mot de passe
		set(value) {
			const hash = bcrypt.hashSync(value, 10);
			this.setDataValue('password', hash);
		}
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});


module.exports = User;
