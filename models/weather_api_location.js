'use strict';

module.exports = (sequelize, DataTypes) => {

  const modelsApi = sequelize.models;
  const WeatherApiLocation = sequelize.define('WeatherApiLocation',
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      c: DataTypes.STRING,
      zmw: DataTypes.STRING,
      tz: DataTypes.STRING,
      tzs: DataTypes.STRING,
      l: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      ll: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      alertsLastCheck: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      classMethods: {
        associate: (models) => {
          WeatherApiLocation.hasOne(models.Home, { foreignKey: 'weatherApiLocationId' });
        },

        getAddress: (homeId, identityId) =>
          modelsApi.WeatherApiLocation
            .findOne({
              attributes: ['l', 'lat', 'lon'],
              include: [
                {
                  model: modelsApi.Home,
                  required: true,
                  where: { id: homeId },
                  attributes: [],
                  include: [
                    {
                      model: modelsApi.User,
                      required: true,
                      where: { identityId },
                      attributes: []
                    }
                  ]
                }
              ]
            })
            .then((weatherApiLocation) => {
              const result = {};

              if (weatherApiLocation) {
                result.wuLocation = weatherApiLocation.l;
                result.lat = weatherApiLocation.lat;
                result.lon = weatherApiLocation.lon;
              }

              return result;
            })
      }
    }
  );

  return WeatherApiLocation;
};
