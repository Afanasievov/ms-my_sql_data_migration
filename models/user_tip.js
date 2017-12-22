'use strict';

module.exports = (sequelize, DataTypes) => {

  const UserTip = sequelize.define('UserTip',
    {
      userId: {
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
      classMethods: {
        associate: (models) => {
          UserTip.belongsTo(models.User, { foreignKey: 'userId' });
          UserTip.belongsTo(models.Tip, { foreignKey: 'tipId' });
        }
      }
    }
  );

  return UserTip;
};

