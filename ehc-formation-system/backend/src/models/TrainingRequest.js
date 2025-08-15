'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainingRequest.belongsTo(models.User, {
        as: 'requester',
        foreignKey: 'user_id',
      });
      TrainingRequest.belongsTo(models.TrainingCourse, {
        as: 'requestedCourse',
        foreignKey: 'course_id',
      });
      TrainingRequest.belongsTo(models.TrainingSession, {
        as: 'requestedSession',
        foreignKey: 'session_id',
      });
      TrainingRequest.belongsTo(models.User, {
        as: 'approver',
        foreignKey: 'approved_by',
      });
    }
  }
  TrainingRequest.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'training_courses',
        key: 'course_id',
      }
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'training_sessions',
        key: 'session_id',
      }
    },
    requested_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    justification: {
      type: DataTypes.TEXT,
    },
    urgency: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    estimated_cost: {
      type: DataTypes.DECIMAL(10, 2),
    },
    status: {
      type: DataTypes.ENUM('pending', 'manager_approved', 'hr_approved', 'rejected', 'planned'),
      defaultValue: 'pending',
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id',
      }
    },
    approval_date: {
      type: DataTypes.DATE,
    },
    rejection_reason: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'TrainingRequest',
    tableName: 'training_requests',
    timestamps: false,
    underscored: true,
  });
  return TrainingRequest;
};