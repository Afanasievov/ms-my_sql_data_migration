'use strict';

class CommodityTypesEnum {

  constructor() {
    this.electricity = 1;
    this.gas = 2;
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }

}

const instance = new CommodityTypesEnum();

module.exports = instance;
