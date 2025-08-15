'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company'
      });
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'roles'
      });
      User.hasMany(models.ProspectInteraction, {
        foreignKey: 'user_id',
        as: 'prospectInteractions'
      });
      User.hasMany(models.Quote, {
        foreignKey: 'created_by',
        as: 'createdQuotes'
      });
      User.hasMany(models.SubscriptionHistory, {
        foreignKey: 'performed_by',
        as: 'subscriptionHistory'
      });
      User.hasMany(models.SupportTicket, {
        foreignKey: 'user_id',
        as: 'submittedSupportTickets'
      });
      User.hasMany(models.SupportTicket, {
        foreignKey: 'assigned_to',
        as: 'assignedSupportTickets'
      });
      User.hasMany(models.SupportMessage, {
        foreignKey: 'sender_id',
        as: 'sentSupportMessages'
      });
      User.hasMany(models.ClientNote, {
        foreignKey: 'user_id',
        as: 'authoredClientNotes'
      });
      User.hasMany(models.SatisfactionSurvey, {
        foreignKey: 'user_id',
        as: 'submittedSatisfactionSurveys'
      });
      User.hasMany(models.RetentionAction, {
        foreignKey: 'executed_by',
        as: 'executedRetentionActions'
      });
      User.hasMany(models.Cancellation, {
        foreignKey: 'processed_by',
        as: 'processedCancellations'
      });
      User.hasMany(models.ClientHistory, {
        foreignKey: 'user_id',
        as: 'clientHistoryEntries'
      });
      User.hasMany(models.SystemLog, {
        foreignKey: 'user_id',
        as: 'systemLogs'
      });
      User.hasMany(models.Notification, {
        foreignKey: 'recipient_id',
        as: 'receivedNotifications'
      });
      User.hasMany(models.TrainingCourse, {
        foreignKey: 'created_by',
        as: 'createdTrainingCourses'
      });
      User.hasMany(models.Trainer, {
        foreignKey: 'trainer_id',
        as: 'trainerProfile'
      });
      User.hasMany(models.SessionParticipant, {
        foreignKey: 'user_id',
        as: 'sessionParticipations'
      });
      User.hasMany(models.TrainingRequest, {
        foreignKey: 'user_id',
        as: 'submittedTrainingRequests'
      });
      User.hasMany(models.TrainingRequest, {
        foreignKey: 'approved_by',
        as: 'approvedTrainingRequests'
      });
      User.hasMany(models.TrainingEvaluation, {
        foreignKey: 'participant_id',
        as: 'submittedTrainingEvaluations'
      });
      User.belongsToMany(models.Skill, {
        through: 'user_skills',
        foreignKey: 'user_id',
        otherKey: 'skill_id',
        as: 'skills'
      });
      User.hasMany(models.UserCertification, {
        foreignKey: 'user_id',
        as: 'userCertifications'
      });
      User.hasMany(models.ResourceLibrary, {
        foreignKey: 'uploaded_by',
        as: 'uploadedResources'
      });
      User.hasMany(models.AnnualTrainingPlan, {
        foreignKey: 'created_by',
        as: 'createdAnnualTrainingPlans'
      });
      User.hasMany(models.AnnualTrainingPlan, {
        foreignKey: 'approved_by',
        as: 'approvedAnnualTrainingPlans'
      });
      User.hasMany(models.SystemSettings, {
        foreignKey: 'updated_by',
        as: 'updatedSettings'
      });

    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true, // username might be optional if email is primary login
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
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
    modelName: 'User',
    tableName: 'users',
    timestamps: false, // We are managing created_at and updated_at manually
    underscored: true, // Use underscores for column names (e.g., company_id)
  });
  return User;
};