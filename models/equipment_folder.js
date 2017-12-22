/* eslint-disable new-cap, no-magic-numbers */
'use strict';

module.exports = (sequelize, DataTypes) => {

  const EquipmentFolder = sequelize.define('EquipmentFolder',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isEditable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'DEF-CUSTOM'
      },
      homeId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      iconId: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
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
      classMethods: {
        associate: (models) => {
          EquipmentFolder.belongsTo(models.Home, { foreignKey: 'homeId' });
          EquipmentFolder.belongsTo(models.Icon, { foreignKey: 'iconId' });
          EquipmentFolder.belongsTo(models.Equipment, { foreignKey: 'id', targetKey: 'folderId' });
        },

        initializeDefault: (homeId) => {
          const query =
            `INSERT INTO EquipmentFolders (title, isEditable, homeId, iconId, tag, isActive)
            SELECT title, isEditable, ${homeId}, iconId, tag, isActive from DefaultEquipmentFolders`;

          return sequelize
            .query(query)
            .then(() => Promise.resolve(homeId));
        }
      }
    }
  );

  return EquipmentFolder;
};

