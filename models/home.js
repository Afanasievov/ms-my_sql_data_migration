/* eslint-disable no-magic-numbers */
'use strict';

const ValidationError = require('../services/errors').ValidationError;
const MESSAGES = require('../config/messages.json');

module.exports = (sequelize, DataTypes) => {

  const modelsApi = sequelize.models;
  const Home = sequelize.define('Home',
    {
      square: {
        type: DataTypes.DOUBLE,
        unsigned: true,
        defaultValue: null
      },
      isEnterSquare: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      age: {
        type: DataTypes.INTEGER,
        unsigned: true,
        defaultValue: null
      },
      isEnterAge: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      numberOfPeople: {
        type: DataTypes.INTEGER,
        unsigned: true,
        defaultValue: null
      },
      orderNumber: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false,
        defaultValue: 1
      },
      isCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isRent: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
      },
      userId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      homeTypeId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      stepsId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weatherApiLocationId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      marketId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: true
      },
      externalId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: true
      },
      marketData: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
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
      tableName: 'Homes',
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          Home.belongsTo(models.User, { foreignKey: 'userId' });
          Home.belongsTo(models.Step, { foreignKey: 'stepsId', targetKey: 'id' });
          Home.belongsTo(models.Market, { foreignKey: 'marketId', targetKey: 'id' });
          Home.belongsTo(models.Address, { foreignKey: 'addressId' });
          Home.belongsTo(models.WeatherApiLocation, { foreignKey: 'weatherApiLocationId' });
          Home.hasMany(models.EquipmentFolder);
          Home.hasMany(models.EnergyBill);
        },

        getHomeIdByEquipmentId: (equipmentId) =>
          modelsApi.Equipment
            .findByPrimary(equipmentId)
            .then((equipment) => {
              if (equipment) {
                return modelsApi.EquipmentFolder.findByPrimary(equipment.folderId);
              }

              return null;
            })
            .then((equipmentFolder) => equipmentFolder ? equipmentFolder.homeId : null),

        isHomeBelongsToIdentity: (identityId, homeId) =>
          modelsApi.Home
            .find({
              attributes: ['id'],
              where: { id: homeId, isActive: true },
              include: [
                {
                  model: modelsApi.User,
                  required: true,
                  where: { identityId },
                  attributes: []
                }
              ]
            })
            .then((home) => !!home),

        deleteById: (homeId, identityId, isCurrent) => {
          // 2,3,4... - ids of implemented markets

          // after MySQL-MSSQL migration updates on tables
          // Addresses, EquipmentFolders, EnergyBills, Efficiencies
          // Equipments, EquipmentPhotos were removed
          // do to disability of MSSQL perform update of multiple tables
          // in a single query and subsequent transformations

          const query =
            `UPDATE Home
            SET Home.isActive = 0
            OUTPUT inserted.id
              FROM Homes Home
              INNER JOIN Users Us
                ON Us.id = Home.userId
            WHERE
              Home.isActive = 1
              AND Home.id = :homeId${isCurrent ? '' : ' AND Home.isCurrent = 0'}
              AND (Home.marketId IS NULL OR Home.marketId = 1)
              AND Us.identityId = :identityId`;

          return sequelize.query(query,
            {
              replacements: { homeId, identityId }
            }
          );
        },

        insertWelcomeEfficiencies: (identityId) =>
          modelsApi.User
            .findOne({
              raw: true,
              attributes: ['id'],
              where: { identityId }
            })
            .then(({ id }) => {
              const query =
                `INSERT INTO Efficiencies
                  (title, body, startDate, expiredDate, campaignEfficienciesId, userId)
                SELECT title, body, GETDATE(), DATEADD(year, 14, GETDATE()) as expiredDate,
                 campaignEfficienciesId, ${id}
                FROM WelcomeEfficiencies
                WHERE WelcomeEfficiencies.isActive = 1`;

              return sequelize.query(query);
            }),

        getAddressById: (homeId, identityId) =>
          modelsApi.Home
            .findOne({
              include: [
                { model: modelsApi.Address },
                {
                  model: modelsApi.User,
                  attributes: [],
                  where: { identityId }
                }
              ],
              where: { id: homeId, isActive: true },
              raw: true
            })
            .then((address) => address
              ? address
              : Promise.reject(new ValidationError(MESSAGES.INCORRECT_SQL_PARAMS))
            ),

        getMarketData: (identityId, homeId) =>
          modelsApi.Home
            .findOne({
              raw: true,
              attributes: ['marketId', 'externalId', 'marketData'],
              include: [
                {
                  model: modelsApi.User,
                  attributes: [],
                  required: true,
                  where: { identityId },
                  include: [
                    {
                      model: modelsApi.UserMarket,
                      attributes: [],
                      required: true,
                      include: [
                        {
                          model: modelsApi.Market,
                          attributes: ['id', 'jurisdiction'],
                          required: true
                        }
                      ]
                    }
                  ]
                }
              ],
              where: { id: homeId }
            })
      }
    }
  );

  return Home;
};
