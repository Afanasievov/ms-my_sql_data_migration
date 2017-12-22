'use strict';

class EquipmentTagsEnum {

  constructor()   {
    this.heatPump = { id: 1, tag: 'heatPump' };
    this.acUnit = { id: 2, tag: 'acUnit' };
    this.gasEleHeat = { id: 3, tag: 'gasEleHeat' };
    this.filter = { id: 5, tag: 'filter' };
    this.floorHeating = { id: 6, tag: 'floorHeating' };
    this.tanklessWaterHeat = { id: 7, tag: 'tanklessWaterHeat' };
    this.eleWaterHeat = { id: 8, tag: 'eleWaterHeat' };
    this.gasWaterHeat = { id: 9, tag: 'gasWaterHeat' };
    this.solar = { id: 10, tag: 'solar' };
    this.hotTubs = { id: 11, tag: 'hotTubs' };
    this.pool = { id: 12, tag: 'pool' };
    this.thermostats = { id: 13, tag: 'thermostats' };
    this.smartThermostats = { id: 14, tag: 'smartThermostats' };
    this.detectors = { id: 15, tag: 'detectors' };
    this.carbonMonoxideDetectors = { id: 16, tag: 'carbonMonoxideDetectors' };
    this.heatPumpGeothermal = { id: 17, tag: 'heatPumpGeothermal' };
    this.heatPumpAir = { id: 18, tag: 'heatPumpAir' };
    this.heatPumpWater = { id: 19, tag: 'heatPumpWater' };
    this.poolEle = { id: 20, tag: 'poolEle' };
    this.poolGas = { id: 21, tag: 'poolGas' };
    this.floorHeatingEle = { id: 22, tag: 'floorHeatingEle' };
    this.floorHeatingGas = { id: 23, tag: 'floorHeatingGas' };
    this.windowAcUnit = { id: 24, tag: 'windowAcUnit' };
    this.programmableThermostats =   { id: 25, tag: 'programmableThermostats' };
    this.noType = { id: 0, tag: 'noType' };
  }

  validate(tagName) {
    return this.hasOwnProperty(tagName);
  }

}

const instance = new EquipmentTagsEnum();

module.exports = instance;
