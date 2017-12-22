'use strict';

module.exports = (sequelize, DataTypes) => {

  const CampaignEfficiency = sequelize.define('CampaignEfficiency',
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
      recurringId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isSendPushNotification: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      recurringEndDate: DataTypes.DATE,
      efficiencyBody: {
        type: DataTypes.STRING,
        allowNull: true
      },
      efficiencyTitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      expiredDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createByEmail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      campaignTypeId: {
        type: DataTypes.INTEGER,
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
      tableName: 'CampaignEfficiencies',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          CampaignEfficiency.belongsTo(models.CampaignType, { foreignKey: 'campaignTypeId' });
          CampaignEfficiency.belongsTo(models.Group, { foreignKey: 'groupId' });
          CampaignEfficiency.belongsTo(models.StaticRecurring, { foreignKey: 'recurringId' });
          CampaignEfficiency.belongsTo(models.UserGroup, { foreignKey: 'groupId', targetKey: 'groupId' });
        }
      }
    }
  );

  return CampaignEfficiency;
};
