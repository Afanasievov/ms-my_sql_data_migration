/* eslint-disable new-cap */
'use strict';

module.exports = (sequelize, DataTypes) => {

  const UserGroup = sequelize.define('UserGroup',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      homeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    },
    {
      tableName: 'UserGroups',
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      classMethods: {
        associate: (models) => {
          UserGroup.belongsTo(models.User, { foreignKey: 'userId' });
          UserGroup.belongsTo(models.Group, { foreignKey: 'groupId' });
          UserGroup.belongsTo(models.Home, { foreignKey: 'homeId' });
        }
      }
    }
  );

  return UserGroup;
};
