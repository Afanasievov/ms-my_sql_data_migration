'use strict';

module.exports = (sequelize, DataTypes) => {

  const Group = sequelize.define('Group',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createByEmail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'Groups',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {

          Group.hasMany(models.UserGroup, {
            foreignKey: 'groupId'
          });

        }
      }

    }
  );

  return Group;
};
