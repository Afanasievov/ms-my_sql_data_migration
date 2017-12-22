'use strict';

class ExternalServicesEnum {

  constructor() {
    this.ab = 'AB API';
    this.customerContract = 'Customer contract API';
    this.eha = 'EHA API';
    this.indentity = 'Identity Service';
    this.notifications = 'Notifications API';
    this.prediction = 'Prediction API';
    this.tx = 'TX API';
    this.weather = 'Weather API';
  }

}

const instance = new ExternalServicesEnum();

module.exports = instance;
