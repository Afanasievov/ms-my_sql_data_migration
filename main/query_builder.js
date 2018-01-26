const moment = require('moment');

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const convertValue = (value) => {
  if (typeof value === 'string') {
    value = `'${value.replace(/'/g, "''")}'`;
  } else if (value instanceof Date) {
    value = `'${moment.utc(value).format(dateFormat)}'`;
  } else if (value && typeof value === 'object' && JSON.stringify(value)) {
    Object.keys(value).forEach((key) => typeof value[key] === 'string' && (value[key] = value[key].replace(/'/g, "''")));
    value = `'${JSON.stringify(value)}'`;
  }

  return value;
};

const getInsertValues = (values) => values.reduce(
  (memo, curr, i) =>
    memo + Object.keys(curr)
      .reduce((acc, val, j, arr) =>
        `${acc}${convertValue(curr[val])}${(j === arr.length - 1) ? (i === values.length - 1 ? ');' : '),') : ',' }`,
      '('),
  '');

/**
 * @param {Object} table
 * @param {String} table.source
 * @param {String} table.columns
 * @param {String} [where] - sql where statement
 * @returns {String} Select query
 */
const getSelectQuery = (table, where) => `SELECT ${table.columns} FROM ${table.source} ${where ? where : ''}`;

/**
 * @param {Object} table
 * @param {String} table.target
 * @param {String} table.columns
 * @param {Array.Object} values
 * @param {Boolean} isAutoincrement
 * @returns {String} Insert query
 */
const getInsertQuery = (table, values, isAutoincrement) =>
  `${isAutoincrement ? 'SET IDENTITY_INSERT ' + table.target + ' ON' : ''}
  INSERT INTO ${table.target} (${table.columnsInsert ? table.columnsInsert : table.columns})
  VALUES
  ${getInsertValues(values)}
  ${isAutoincrement ? 'SET IDENTITY_INSERT ' + table.target + ' OFF' : ''}`;

/**
 * @param {String} tableName
 * @returns {String} Count (*) query
 */
const getCountQuery = (tableName) => `SELECT COUNT(*) AS count FROM ${tableName}`;

module.exports = {
  getSelectQuery,
  getInsertQuery,
  getCountQuery
};
