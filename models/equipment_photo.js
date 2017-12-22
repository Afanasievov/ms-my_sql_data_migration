/* eslint-disable new-cap */
'use strict';

module.exports = (sequelize, DataTypes) => {

  const EquipmentPhoto = sequelize.define('EquipmentPhoto',
    {
      id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      equipmentId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
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
      classMethods: {
        associate: (models) => {
          EquipmentPhoto.belongsTo(models.Equipment, {
            foreignKey: 'equipmentId'
          });
        }
      }
    }
  );

  return EquipmentPhoto;
};

