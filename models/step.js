'use strict';

module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step',
    {
      isAcUnitsStepMarked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isCarbonMonoxideDetectors: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isDetectors: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isEleWaterHeat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isFilters: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isGasWaterHeat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isHeatPumps: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isHotTub: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isInFloorHeating: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isPools: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isProgrammableThermostats: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isSmartThermostats: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isSolarPanels: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isTanklessWaterHeat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isThermostats: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isWindowAcUnits: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      createdAt: false,
      updatedAt: false,
      classMethods: {
        associate: (models) => {
          Step.hasOne(models.Home, { foreignKey: 'stepsId', targetKey: 'id' });
        }
      }
    }
  );

  return Step;
};
