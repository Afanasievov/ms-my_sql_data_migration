/* eslint-disable no-magic-numbers */
'use strict';

module.exports = (sequelize, DataTypes) => {

  const Market = sequelize.define('Market',
    {
      name: DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return Market;
};
