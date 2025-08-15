'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Certification.hasMany(models.UserCertification, {
        foreignKey: 'certification_id',
        as: 'userCertifications'
      });
    }
  }
  Certification.init({
    certification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    certification_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issuing_organization: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    validity_period_months: {
      type: DataTypes.INTEGER
    },
    requirements: {
      type: DataTypes.JSON
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Certification',
    tableName: 'certifications',
    timestamps: false,
    underscored: true
  });
  return Certification;
};