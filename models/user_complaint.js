'use strict';

const moment = require('moment-timezone');
const outageTypes = require('./enums/outage_types.enum');
const getDistanceQuery = require('../services/get_distance_query_sql');

module.exports = (sequelize, DataTypes) => {

  const modelsApi = sequelize.models;
  const UserComplaint = sequelize.define('UserComplaint',
    {
      id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      homeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      premiseId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: outageTypes.electricity
      },
      snapshot: {
        type: DataTypes.JSON,
        allowNull: false
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
      },
      isPushed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      classMethods: {
        associate: (models) => {
          UserComplaint.belongsTo(models.User, { foreignKey: 'userId' });
          UserComplaint.belongsTo(models.Home, { foreignKey: 'homeId' });
        },

        /**
         *
         * @param latitude
         * @param longitude
         * @param outageConfigs
         * @param outageConfigs.radius {Integer}
         * @param outageConfigs.duration {Integer}
         * @param outageConfigs.durationMeasure {String}
         * @returns {Object} - { count, isPushed }
         */
        countOutages: (latitude, longitude, outageConfigs) => {
          const { radius, duration, durationMeasure } = outageConfigs;
          const distanceQuery = `${getDistanceQuery(longitude, latitude)} < ${radius}`; // distance in m

          return modelsApi.UserComplaint.findAll({
            attributes: ['isPushed'],
            where: {
              createdAt: { $gt: moment().subtract(duration, durationMeasure).toDate() }
            },
            include: [
              {
                model: modelsApi.Home,
                attributes: [],
                where: { isActive: true },
                include: [
                  {
                    model: modelsApi.Address,
                    attributes: [],
                    where: sequelize.literal(distanceQuery)
                  }
                ]
              }
            ]
          })
            .then((data) => ({
              count: data.length,
              isPushed: !!data.find((complaint) => complaint.isPushed === true)
            }));
        }
      }
    }
  );

  return UserComplaint;
};
