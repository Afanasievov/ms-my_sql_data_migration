'use strict';

module.exports = (sequelize, DataTypes) => {

  const WeatherAlert = sequelize.define('WeatherAlert',
    {
      id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true
      },
      campaignId: {
        type: DataTypes.UUID,
        unique: true
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
    }
  );

  return WeatherAlert;
};
