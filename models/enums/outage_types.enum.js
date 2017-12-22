'use strict';

class OutageTypesEnum {

  constructor() {
    this.electricity = 'electricity';
    this.gas = 'gas';
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }

}

const instance = new OutageTypesEnum();

module.exports = instance;
