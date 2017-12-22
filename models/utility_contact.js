/* eslint-disable new-cap, no-magic-numbers */
'use strict';

module.exports = (sequelize, DataTypes) => {
  const UtilityContact = sequelize.define('UtilityContact', {
    id: {
      type: DataTypes.INTEGER,
      unsigned: true,
      primaryKey: true
    },
    jurisdiction: {
      type: DataTypes.STRING,
      allowNull: false
    },
    utility: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: DataTypes.STRING,
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: DataTypes.STRING
  }, {
    classMethods: {},
    createdAt: false,
    updatedAt: false
  });

  return UtilityContact;
};
