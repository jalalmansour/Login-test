'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProspectInteraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProspectInteraction.belongsTo(models.Prospect, {
        foreignKey: 'prospect_id',
      });
      ProspectInteraction.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  ProspectInteraction.init({
    interaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prospect_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prospects',
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
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.TEXT
    },
    next_action_date: {
      type: DataTypes.DATE
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
    modelName: 'ProspectInteraction',
    tableName: 'prospect_interactions',
    timestamps: false, // Assuming created_at and updated_at are handled manually or via hooks
    underscored: true, // Use snake_case for column names
  });
  return ProspectInteraction;
};