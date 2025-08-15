'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SupportTicket.belongsTo(models.Company, {
        foreignKey: 'company_id',
      });
      SupportTicket.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'requester'
      });
      SupportTicket.belongsTo(models.User, {
        foreignKey: 'assigned_to',
        as: 'assignee'
      });
      SupportTicket.hasMany(models.SupportMessage, {
        foreignKey: 'ticket_id',
        as: 'messages'
      });
    }
  }
  SupportTicket.init({
    ticket_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    category: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    resolved_at: {
      type: DataTypes.DATE
    },
    closed_at: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'SupportTicket',
    tableName: 'support_tickets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return SupportTicket;
};