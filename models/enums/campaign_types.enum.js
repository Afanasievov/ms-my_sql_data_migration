'use strict';

class CompanyTypesEnum {

  constructor() {
    this.recurring = { id: 1, name: 'Recurring' };
    this.welcome = { id: 2, name: 'Welcome' };
    this.once = { id: 3, name: 'Once' };

    this.recurringId = this.recurring.id;
    this.welcomeId = this.welcome.id;
    this.onceId = this.once.id;
  }

}

const instance = new CompanyTypesEnum();

module.exports = instance;
