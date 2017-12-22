'use strict';

class StepsNamesEnum {

  constructor() {

    this.isAcUnitsStepMarked = 'isAcUnitsStepMarked';
    this.isCarbonMonoxideDetectors = 'isCarbonMonoxideDetectors';
    this.isDetectors = 'isDetectors';
    this.isEleWaterHeat = 'isEleWaterHeat';
    this.isFilters = 'isFilters';
    this.isGasWaterHeat = 'isGasWaterHeat';
    this.isHeatPumps = 'isHeatPumps';
    this.isHotTub = 'isHotTub';
    this.isInFloorHeating = 'isInFloorHeating';
    this.isPools = 'isPools';
    this.isProgrammableThermostats = 'isProgrammableThermostats';
    this.isSmartThermostats = 'isSmartThermostats';
    this.isSolarPanels = 'isSolarPanels';
    this.isTanklessWaterHeat = 'isTanklessWaterHeat';
    this.isThermostats = 'isThermostats';
    this.isWindowAcUnits = 'isWindowAcUnits';
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }
}

const instance = new StepsNamesEnum();

module.exports = instance;
