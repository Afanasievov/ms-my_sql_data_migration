'use strict';

module.exports = (sequelize, DataTypes) => {

  const StaticRecurring = sequelize.define('StaticRecurring',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      recurring: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return StaticRecurring;
};
