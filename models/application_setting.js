'use strict';

module.exports = (sequelize, DataTypes) => {

  const modelsApi = sequelize.models;
  const AppSetting = sequelize.define('AppSetting',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      temperatureScale: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      isHaveEnergyBill: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isJustEnergyCustomer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      userId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
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
          AppSetting.belongsTo(models.User, { foreignKey: 'userId' });
        },

        addOrUpdate: (userId, data) => modelsApi.AppSetting
          .findOne({ where: { userId } })
          .then((entry) => entry
            ? modelsApi.AppSetting.update(data, { where: { userId } })
            : modelsApi.AppSetting.create(data)
          )
      }
    }
  );

  return AppSetting;
};
