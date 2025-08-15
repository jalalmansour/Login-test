'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prospect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prospect.belongsTo(models.User, {
        foreignKey: 'assigned_to',
        as: 'assignedUser'
      });
      Prospect.hasMany(models.ProspectInteraction, {
        foreignKey: 'prospect_id',
        as: 'interactions'
      });
      Prospect.hasMany(models.Quote, {
        foreignKey: 'prospect_id',
        as: 'quotes'
      });
      Prospect.hasMany(models.ProspectSource, {
        foreignKey: 'prospect_id',
        as: 'sources'
      });
      // Assuming a prospect might eventually become a company
      // Prospect.hasOne(models.Company, {
      //   foreignKey: 'prospect_id',
      //   as: 'company'
      // });
    }
  }
  Prospect.init({
    company_name: DataTypes.STRING,
    contact_name: DataTypes.STRING,
    contact_email: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    industry: DataTypes.STRING,
    company_size: DataTypes.STRING,
    status: DataTypes.STRING, // (nouveau, qualifié, intéressé, perdu)
    lead_score: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER, // FK to users
  }, {
    sequelize,
    modelName: 'Prospect',
    tableName: 'prospects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Prospect;
};