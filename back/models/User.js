const { bdd } = require('../config/connect');
const { DataTypes } = require('sequelize');

const User = bdd.define('User', {
	pseudo: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			len: {
				args: [3, 35],
				msg: 'Le pseudo doit faire entre 3 et 35 caractères.',
			},
		},
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				arg: true,
				msg: 'Adresse email invalide',
			},
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		valide: {
			min: 6,
		},
	},
	picture: {
		type: DataTypes.STRING,
		defaultValue: 'http://localhost:8000/uploads/random-user.png',
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

module.exports = User;
