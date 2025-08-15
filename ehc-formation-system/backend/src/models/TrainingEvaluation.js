'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingEvaluation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainingEvaluation.belongsTo(models.TrainingSession, {
        foreignKey: 'session_id',
      });
      TrainingEvaluation.belongsTo(models.User, {
        foreignKey: 'participant_id',
      });
    }
  }
  TrainingEvaluation.init({
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'training_sessions',
        key: 'id',
      }
    },
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    evaluation_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evaluation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    overall_rating: {
      type: DataTypes.INTEGER,
    },
    content_rating: {
      type: DataTypes.INTEGER,
    },
    trainer_rating: {
      type: DataTypes.INTEGER,
    },
    organization_rating: {
      type: DataTypes.INTEGER,
    },
    would_recommend: {
      type: DataTypes.BOOLEAN,
    },
    comments: {
      type: DataTypes.TEXT,
    },
    skills_acquired: {
      type: DataTypes.JSON,
    },
    improvement_suggestions: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'TrainingEvaluation',
    tableName: 'training_evaluations',
    timestamps: false,
  });
  return TrainingEvaluation;
};