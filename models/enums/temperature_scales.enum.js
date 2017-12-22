'use strict';

class TemperatureScalesEnum {

  constructor() {
    this.F = 'F';
    this.C = 'C';
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }

}

const instance = new TemperatureScalesEnum();

module.exports = instance;
