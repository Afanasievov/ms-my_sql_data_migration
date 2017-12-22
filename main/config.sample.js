// Save this file as config.js and fill in db configs

/**
 * @param {String} db - db name for migration [eha|notifications|weather]
 * @returns {Object} - db config
 */

const dataBases = (db) => ({
  ms_devd: {
    username: 'USERNAME',
    password: 'PASSWORD',
    host: 'HOST',
    database: `${db}_DATABASE`,
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
      multipleStatements: true
    },
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    }
  },
  my_devd: {
    username: 'USERNANE',
    password: 'PASSWORD',
    host: 'HOST',
    database: `${db}_DATABASE`,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      multipleStatements: true
    }
  }
});

module.exports = (db, configName) => dataBases(db)[configName];
