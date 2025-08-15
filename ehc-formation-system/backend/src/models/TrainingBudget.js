'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingBudget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainingBudget.belongsTo(models.Company, {
        foreignKey: 'company_id',
      });
      TrainingBudget.belongsTo(models.AnnualTrainingPlan, {
        foreignKey: 'plan_id',
      });
    }
  }
  TrainingBudget.init({
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id',
      },
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Can be a general budget not tied to a specific plan initially
      references: {
        model: 'annual_training_plans',
        key: 'id',
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allocated_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    spent_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    remaining_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'TrainingBudget',
    tableName: 'training_budgets',
  });
  return TrainingBudget;
};