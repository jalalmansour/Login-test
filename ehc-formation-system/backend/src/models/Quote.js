'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quote.belongsTo(models.Prospect, {
        foreignKey: 'prospect_id',
        as: 'prospect'
      });
      Quote.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company'
      });
      Quote.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'createdBy'
      });
      Quote.hasMany(models.QuoteItem, {
        foreignKey: 'quote_id',
        as: 'items'
      });
      Quote.hasOne(models.Contract, {
        foreignKey: 'quote_id',
        as: 'contract'
      });
    }
  }
  Quote.init({
    quote_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    prospect_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prospects',
        key: 'id'
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'sent', 'accepted', 'rejected', 'expired'),
      allowNull: false,
      defaultValue: 'draft'
    },
    valid_until: {
      type: DataTypes.DATE
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    discount_percent: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00
    },
    notes: {
      type: DataTypes.TEXT
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
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
    modelName: 'Quote',
    tableName: 'quotes',
    timestamps: false, // Using custom created_at and updated_at
    underscored: true,
  });
  return Quote;
};