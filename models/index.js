'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('sqlNamespace');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (path.extname(file) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Sequelize.cls = namespace;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
