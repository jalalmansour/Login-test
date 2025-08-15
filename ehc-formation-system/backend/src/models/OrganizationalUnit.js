'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationalUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrganizationalUnit.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company'
      });
      OrganizationalUnit.hasMany(models.OrganizationalUnit, {
        foreignKey: 'parent_unit_id',
        as: 'children'
      });
      OrganizationalUnit.belongsTo(models.OrganizationalUnit, {
        foreignKey: 'parent_unit_id',
        as: 'parent'
      });
      OrganizationalUnit.hasMany(models.User, {
        foreignKey: 'organizational_unit_id',
        as: 'users'
      });
    }
  }
  OrganizationalUnit.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent_unit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'organizational_units',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'OrganizationalUnit',
    tableName: 'organizational_units',
    timestamps: false, // We are managing created_at and updated_at manually
    underscored: true, // Use snake_case for column names
  });
  return OrganizationalUnit;
};