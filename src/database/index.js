const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Token = require('../models/Token');
const Repository = require('../models/Repository');

const connection = new Sequelize(dbConfig);

User.init(connection);
Token.init(connection);
Repository.init(connection);

Token.associate(connection.models);
User.associate(connection.models);
Repository.associate(connection.models);

module.exports = connection;
