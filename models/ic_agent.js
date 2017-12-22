'use strict';

module.exports = (sequelize, DataTypes) => {

  const IcAgent = sequelize.define('IcAgent',
    {
      icNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      icEmail: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      createdAt: false,
      updatedAt: false,
      classMethods: {
        associate: (models) => {
          IcAgent.hasMany(models.User, { foreignKey: 'icId' });
        }
      }
    }
  );

  return IcAgent;
};
