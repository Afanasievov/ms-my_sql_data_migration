/* eslint-disable new-cap */
'use strict';

module.exports = (sequelize, DataTypes) => {

  const EnergyBill = sequelize.define('EnergyBill',
    {
      id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
      },
      totalMonthlyBillAmount: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastBillDate: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currentMonthUsage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billingPeriod: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currentRate: {
        type: DataTypes.STRING,
        allowNull: true
      },
      monthlyUtilityFees: {
        type: DataTypes.STRING,
        allowNull: true
      },
      utilName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      utilCode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountMaskComment: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountLabel: {
        type: DataTypes.STRING,
        allowNull: true
      },
      friendlyName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      jurisdictionShortIdentifier: {
        type: DataTypes.STRING,
        allowNull: true
      },
      marketParticipantIdentifier: {
        type: DataTypes.STRING,
        allowNull: true
      },
      marketParticipantShortIdentifier: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountValidationRegularExpression: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountMaskPublic: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      commodityTypeIdentifier: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      homeId: {
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
      },
      marketId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'EnergyBills',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          EnergyBill.belongsTo(models.Commodity, { foreignKey: 'commodityTypeIdentifier' });
          EnergyBill.belongsTo(models.Home, { foreignKey: 'homeId' });
        }
      }
    }
  );

  return EnergyBill;
};

