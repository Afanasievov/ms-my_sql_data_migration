'use strict';

const ValidationError = require('../services/errors').ValidationError;
const MESSAGES = require('../config/messages.json');

module.exports = (sequelize, DataTypes) => {
  const modelsApi = sequelize.models;

  const Address = sequelize.define('Address',
    {
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      countryCode: DataTypes.STRING,
      latitude: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      longitude: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      serviceAddress: DataTypes.STRING,
      state: DataTypes.STRING,
      photo: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      zip: DataTypes.STRING,
      formatted: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
      tableName: 'Addresses',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          Address.hasOne(models.Home, {
            foreignKey: 'addressId'
          });
        },
        /**
         * @param photo
         * @param homeId
         * @param identityId
         * @returns {Promise.<Object>|*}
         */
        setPhotoByParams: (photo, homeId, identityId) => modelsApi.Address
          .find({
            where: { isActive: true },
            include: [
              {
                model: modelsApi.Home,
                required: true,
                where: { id: homeId, isActive: true },
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
          .then((address) => {
            if (!address) {
              return Promise.reject(new ValidationError(MESSAGES.INCORRECT_SQL_PARAMS));
            }

            address.photo = photo;
            return address.save();
          })
      }
    }
  );

  return Address;
};
