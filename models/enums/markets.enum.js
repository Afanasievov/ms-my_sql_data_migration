'use strict';

class MarketsEnum {

  constructor() {
    this.tx = {
      id: 2,
      name: 'Texas',
      jurisdiction: 'tx'
    };
    this.ab = {
      id: 3,
      name: 'Alberta',
      jurisdiction: 'ab'
    };
  }

  validateId(value) {
    return Object.keys(this).find((market) => this[market].id === value);
  }

  validateJurisdiction(value) {
    return this.hasOwnProperty(value.toLowerCase());
  }
}

const instance = new MarketsEnum();

module.exports = instance;
