'use strict';

module.exports = (sequelize, DataTypes) => {

  const Tip = sequelize.define('Tip',
    {
      name: DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt: false,
      classMethods: {
        associate: (models) => {
          Tip.hasMany(models.UserTip, { foreignKey: 'tipId' });
          Tip.hasMany(models.TipMapping, { foreignKey: 'tipId' });
        }
      }
    }
  );

  return Tip;
};
