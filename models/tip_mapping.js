'use strict';

module.exports = (sequelize, DataTypes) => {

  const TipMapping = sequelize.define('TipMapping',
    {
      tipStateId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      tipId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      }
    },
    {
      createdAt: false,
      updatedAt: false,
      classMethods: {
        associate: (models) => {
          TipMapping.belongsTo(models.TipState, { foreignKey: 'tipStateId' });
          TipMapping.belongsTo(models.Tip, { foreignKey: 'tipId' });
        }
      }
    }
  );

  return TipMapping;
};

