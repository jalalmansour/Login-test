'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainingSession.belongsTo(models.TrainingCourse, {
        foreignKey: 'course_id',
        as: 'course'
      });
      TrainingSession.belongsTo(models.User, {
        foreignKey: 'trainer_id',
        as: 'trainer'
      });
      TrainingSession.hasMany(models.SessionParticipant, {
        foreignKey: 'session_id',
        as: 'participants'
      });
      TrainingSession.hasMany(models.TrainingEvaluation, {
        foreignKey: 'session_id',
        as: 'evaluations'
      });
    }
  }
  TrainingSession.init({
    session_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'training_courses',
        key: 'course_id'
      }
    },
    session_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location_details: {
      type: DataTypes.STRING,
      allowNull: true
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', // Assuming trainers are users
        key: 'user_id'
      }
    },
    max_participants: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'planned'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies', // For private sessions
        key: 'company_id'
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
    modelName: 'TrainingSession',
    tableName: 'training_sessions',
    timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt
    underscored: true, // Use underscores for column names
  });
  return TrainingSession;
};