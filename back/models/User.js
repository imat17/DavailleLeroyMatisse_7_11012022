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
		validate: {
			min: {
				args: [6],
				msg: 'Le mot de passe est trop court (minimum 6 caractères)',
			},
		},
	},
	picture: {
		type: DataTypes.STRING,
		defaultValue: './uploads/profil/random-user.png',
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

module.exports = User;
