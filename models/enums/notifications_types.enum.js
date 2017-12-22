'use strict';

class NotificationsTypesEnum {

  constructor() {
    this.notification = 'notification';
    this.reminder = 'reminder';
    this.weatherAlert = 'weather_alert';
  }

}

const instance = new NotificationsTypesEnum();

module.exports = instance;
