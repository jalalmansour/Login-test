'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnnualTrainingPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AnnualTrainingPlan.belongsTo(models.Company, {
        foreignKey: 'company_id',
      });
      AnnualTrainingPlan.hasMany(models.TrainingPlanItem, {
        foreignKey: 'plan_id',
      });
      AnnualTrainingPlan.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator',
      });
      AnnualTrainingPlan.belongsTo(models.User, {
        foreignKey: 'approved_by',
        as: 'approver',
      });
    }
  }
  AnnualTrainingPlan.init({
    plan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id',
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    used_budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    objectives: {
      type: DataTypes.JSON,
    },
    priority_areas: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.ENUM('draft', 'approved', 'in_progress', 'completed'),
      allowNull: false,
      defaultValue: 'draft',
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    approved_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'AnnualTrainingPlan',
    tableName: 'annual_training_plans',
    timestamps: false,
    underscored: true,
  });
  return AnnualTrainingPlan;
};