/* eslint-disable new-cap, no-magic-numbers */
'use strict';

module.exports = (sequelize, DataTypes) => {
  const modelsApi = sequelize.models;

  const UserMarket = sequelize.define('UserMarket', {
    id: {
      type: DataTypes.INTEGER,
      unsigned: true,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      unsigned: true,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    marketId: {
      type: DataTypes.INTEGER,
      unsigned: true,
      allowNull: false,
      references: {
        model: 'Markets',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    internalMarketId: {
      type: DataTypes.STRING,
      unsigned: true,
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
    }
  },
  {
    classMethods: {
      associate: (models) => {
        UserMarket.belongsTo(models.User, { foreignKey: 'userId' });
        UserMarket.belongsTo(models.Market, { foreignKey: 'marketId', targetKey: 'id' });
      },

      getUserMarketId: (identityId, marketId) =>
        UserMarket
          .findOne({
            attributes: ['internalMarketId'],
            where: { marketId },
            include: [{
              model: modelsApi.User,
              attributes: [],
              where: { identityId }
            }]
          })
          .then((data) => data ? data.internalMarketId : null),

      getUserMarketsIdAll: (identityId) =>
        UserMarket
          .findAll({
            attributes: ['userId', 'marketId', 'internalMarketId'],
            include: [{
              model: modelsApi.User,
              attributes: [],
              where: { identityId }
            }]
          })
    }
  });

  return UserMarket;
};
