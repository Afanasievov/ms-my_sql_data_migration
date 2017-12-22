'use strict';

module.exports = (sequelize, DataTypes) => {

  const Efficiency = sequelize.define('Efficiency',
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
      expiredDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      campaignEfficienciesId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      firstReadDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      readCount: {
        type: DataTypes.INTEGER,
        unsigned: true,
        defaultValue: 0,
        allowNull: false
      },
      lastReadDate: {
        type: DataTypes.DATE,
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
      tableName: 'Efficiencies',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          Efficiency.belongsTo(models.User, {
            foreignKey: 'userId'
          });

          Efficiency.belongsTo(models.CampaignEfficiency, {
            foreignKey: 'campaignEfficienciesId'
          });
        }
      }
    }
  );

  return Efficiency;
};
