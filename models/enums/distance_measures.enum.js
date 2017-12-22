'use strict';

class DistanceMeasuresEnum {

  constructor() {
    this.km = 'km';
    this.mi = 'mi';
  }

  convertToM(value, measure) {
    const factorMi = 1609;
    const factorKm = 1000;
    const factor = measure === this.mi ? factorMi : factorKm;

    return +(value * factor).toFixed(0);
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }

}

const instance = new DistanceMeasuresEnum();

module.exports = instance;
