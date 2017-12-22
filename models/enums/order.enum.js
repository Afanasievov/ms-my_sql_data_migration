'use strict';

class OrderEnum {

  constructor() {
    this.asc = 'asc';
    this.desc = 'desc';
  }

  validate(value) {
    return this.hasOwnProperty(value);
  }

}

const instance = new OrderEnum();

module.exports = instance;
