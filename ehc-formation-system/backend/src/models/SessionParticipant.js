'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SessionParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SessionParticipant.belongsTo(models.TrainingSession, {
        foreignKey: 'session_id',
      });
      SessionParticipant.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  SessionParticipant.init({
    participation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'training_sessions',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attendance_rate: {
      type: DataTypes.DECIMAL(5, 2)
    },
    completion_status: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'SessionParticipant',
    tableName: 'session_participants',
    timestamps: false,
    underscored: true
  });
  return SessionParticipant;
};