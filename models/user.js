'use strict';

const getSqlMergeQuery = require('../services/get_sql_merge_query');

module.exports = (sequelize, DataTypes) => {

  const modelsApi = sequelize.models;
  const User = sequelize.define('User',
    {
      identityId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      icId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      loginCount: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false,
        defaultValue: 0
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
      initMarketSyncAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      classMethods: {
        associate: (models) => {
          User.belongsTo(models.IcAgent, { foreignKey: 'icId' });
          User.hasMany(models.Home, { foreignKey: 'userId' });
          User.hasMany(models.UserGroup, { foreignKey: 'userId' });
          User.hasMany(models.UserTip, { foreignKey: 'userId' });
          User.hasMany(models.UserMarket, { foreignKey: 'userId' });
        },

        createUserMarkets: (identityId, records) =>
          sequelize.transaction(() =>
            modelsApi.User.findOne({
              attributes: ['id'],
              where: { identityId }
            })
              .then((user) => {
                records.map((record) => {
                  record.userId = user.id;
                  return record;
                });

                const targetTable = 'UserMarkets';
                const columns = [
                  { name: 'marketId', type: 'INT' },
                  { name: 'internalMarketId', type: 'VARCHAR(100)' },
                  { name: 'userId', type: 'INT' }
                ];
                const matchColumns = ['userId', 'marketId'];
                const updateColumns = ['internalMarketId'];
                const query = getSqlMergeQuery(targetTable, columns, records, matchColumns, updateColumns);

                return sequelize.query(query);
              })
          ),

        createUserTips: (identityId, tipIds) =>
          sequelize.transaction(() =>
            modelsApi.User.findOne({
              attributes: ['id'],
              where: { identityId }
            })
              .then((user) => {
                const records = tipIds.map((tipId) => ({
                  userId: user.id,
                  tipId: tipId
                }));

                const targetTable = 'UserTips';
                const columns = [
                  { name: 'userId', type: 'INT' },
                  { name: 'tipId', type: 'INT' }
                ];
                const matchColumns = ['userId', 'tipId'];
                const updateColumns = ['userId', 'tipId'];
                const query = getSqlMergeQuery(targetTable, columns, records, matchColumns, updateColumns);

                return sequelize.query(query);
              })
          )
      }
    }
  );

  return User;
};
