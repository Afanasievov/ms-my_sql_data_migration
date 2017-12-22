'use strict';

module.exports = (sequelize, DataTypes) => {

  const TipState = sequelize.define('TipState',
    {
      state: DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt: false,
      classMethods: {
        associate: (models) => {
          TipState.hasMany(models.TipMapping, { foreignKey: 'tipStateId' });
        }
      }
    }
  );

  return TipState;
};
