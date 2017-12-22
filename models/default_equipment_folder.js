'use strict';

module.exports = (sequelize, DataTypes) => {

  const DefaultEquipmentFolder = sequelize.define('DefaultEquipmentFolder',
    {
      title: DataTypes.STRING,
      isEditable: DataTypes.BOOLEAN,
      iconId: DataTypes.INTEGER,
      tag: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return DefaultEquipmentFolder;
};
