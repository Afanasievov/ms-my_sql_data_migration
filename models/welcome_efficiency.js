'use strict';

module.exports = (sequelize, DataTypes) => {

  const Efficiency = sequelize.define('WelcomeEfficiency',
    {
      id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      campaignEfficienciesId: {
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
      tableName: 'WelcomeEfficiencies',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          Efficiency.belongsTo(models.User, { foreignKey: 'userId' });
          Efficiency.belongsTo(models.CampaignEfficiency, { foreignKey: 'campaignEfficienciesId' });
        }
      }
    }
  );

  return Efficiency;
};
