'use strict';
/* jscs:disable maximumLineLength */
/* eslint-disable no-useless-escape */

class PatternsEnum {

  constructor() {
    this.email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.alphaNumericSpecials = /^[\s\w!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]*$/;
    this.icNumber = /^[0-9]{5,15}$/;
    this.name = /^[a-z ,.'-]{1,60}$/i;
  }

}

const instance = new PatternsEnum();

module.exports = instance;
