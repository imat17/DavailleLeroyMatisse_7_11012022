const { bdd } = require('../config/connect');
const { DataTypes } = require('sequelize');

const Like = bdd.define('Like', {});

module.exports = Like;
