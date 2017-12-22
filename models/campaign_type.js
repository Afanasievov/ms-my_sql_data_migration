'use strict';

module.exports = (sequelize, DataTypes) => {

  const CampaignType = sequelize.define('CampaignType',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING
    },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return CampaignType;
};
