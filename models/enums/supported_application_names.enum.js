'use strict';

class SupportedApplicationNamesEnum {

  constructor() {
    this.eha = 'eha';
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }
}

const instance = new SupportedApplicationNamesEnum();

module.exports = instance;
