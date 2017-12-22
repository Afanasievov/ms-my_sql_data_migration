/* eslint-disable new-cap, no-magic-numbers */
'use strict';

module.exports = (sequelize, DataTypes) => {
  const OutageConfig = sequelize.define('OutageConfig', {
    id: {
      type: DataTypes.INTEGER,
      unsigned: true,
      primaryKey: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    durationMeasure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    threshold: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    radiusMeasure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  return OutageConfig;
};
