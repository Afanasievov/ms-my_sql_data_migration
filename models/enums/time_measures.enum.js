'use strict';

class TimeMeasuresEnum {

  constructor() {
    this.minute = 'minute';
    this.hour = 'hour';
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }

}

const instance = new TimeMeasuresEnum();

module.exports = instance;
