'use strict';

module.exports = (sequelize, DataTypes) => {

  const Icon = sequelize.define('Icon',
    {
      name: DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return Icon;
};
