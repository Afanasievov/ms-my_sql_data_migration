'use strict';

const moment = require('moment-timezone');

class DateFormatsEnum {

  constructor() {
    this.moment = 'YYYY-MM-DD HH:mm';
  }

  validate(value) {
    return moment(value, this.moment, true).isValid();
  }

}

const instance = new DateFormatsEnum();

module.exports = instance;
