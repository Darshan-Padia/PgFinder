const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      roleCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'role_code',
      },
    },
    {
      tableName: 'role',
      timestamps: false,
    }
  );

  return Role;
};