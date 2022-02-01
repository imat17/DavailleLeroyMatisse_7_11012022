const { Sequelize } = require('sequelize');

require('dotenv').config();

const bdd = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
});
const connect = async () => {
	try {
		await bdd.authenticate();
		console.log('Database connected');
		return bdd;
	} catch {
		console.error('Database connection failed');
	}
};

module.exports = { connect, bdd };
