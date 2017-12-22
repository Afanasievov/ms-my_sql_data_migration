'use strict';

module.exports = (sequelize, DataTypes) => {

  const Commodity = sequelize.define('Commodity',
    {
      name: DataTypes.STRING,
      shortName: DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return Commodity;
};
