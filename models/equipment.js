'use strict';

module.exports = (sequelize, DataTypes) => {

  const modelsApi = sequelize.models;

  const Equipment = sequelize.define('Equipment',
    {
      id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true
      },
      folderId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      tag: {
        type: DataTypes.STRING,
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
      tableName: 'Equipments',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          Equipment.belongsTo(models.EquipmentFolder, { foreignKey: 'folderId' });
          Equipment.hasMany(models.EquipmentPhoto, { foreignKey: 'equipmentId' });
        },

        getByHomeId: (homeId) => modelsApi.Equipment
          .findAll({
            raw: true,
            attributes: ['tag', 'title'],
            where: { isActive: true },
            include: [{
              attributes: [],
              model: modelsApi.EquipmentFolder,
              include: [{
                attributes: [],
                model: modelsApi.Home,
                where: { id: homeId }
              }]
            }]
          })
      }
    }
  );

  return Equipment;
};
