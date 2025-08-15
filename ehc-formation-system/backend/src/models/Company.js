'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.User, {
        foreignKey: 'company_id',
        as: 'users'
      });
      Company.hasMany(models.Subscription, {
        foreignKey: 'company_id',
        as: 'subscriptions'
      });
      Company.hasMany(models.AnnualTrainingPlan, {
        foreignKey: 'company_id',
        as: 'annualTrainingPlans'
      });
      Company.hasMany(models.TrainingBudget, {
        foreignKey: 'company_id',
        as: 'trainingBudgets'
      });
      Company.hasMany(models.Invoice, {
        foreignKey: 'company_id',
        as: 'invoices'
      });
      Company.hasMany(models.SupportTicket, {
        foreignKey: 'company_id',
        as: 'supportTickets'
      });
      Company.hasMany(models.Prospect, {
        foreignKey: 'company_id',
        as: 'prospects'
      });
      Company.hasMany(models.Contract, {
        foreignKey: 'company_id',
        as: 'contracts'
      });
      Company.hasMany(models.CompanyContact, {
        foreignKey: 'company_id',
        as: 'contacts'
      });
      Company.hasMany(models.Cancellation, {
        foreignKey: 'company_id',
        as: 'cancellations'
      });
      Company.hasMany(models.KPIMetric, {
        foreignKey: 'company_id',
        as: 'kpiMetrics'
      });
      Company.hasMany(models.TrainingSession, {
        foreignKey: 'company_id',
        as: 'trainingSessions'
      });
    }
  }
  Company.init({
    company_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    legal_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    siret: {
      type: DataTypes.STRING,
      allowNull: true
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size_category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('prospect', 'client', 'former_client'),
      allowNull: false,
      defaultValue: 'prospect'
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
    modelName: 'Company',
    tableName: 'companies',
    timestamps: false, // Set to true if you have createdAt and updatedAt columns managed by Sequelize
    underscored: true, // Use underscores for column names
  });
  return Company;
};