'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.Company, {
        foreignKey: 'company_id',
      });
      Subscription.belongsTo(models.Contract, {
        foreignKey: 'contract_id',
      });
      Subscription.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
      Subscription.hasMany(models.Invoice, {
        foreignKey: 'subscription_id',
      });
      Subscription.hasMany(models.SubscriptionHistory, {
        foreignKey: 'subscription_id',
      });
    }
  }
  Subscription.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id',
      },
    },
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contracts',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    next_billing_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    billing_cycle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monthly_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    user_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    }
  }, {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions',
    timestamps: false, // Disable automatic timestamps if you manage them manually
    underscored: true, // Use snake_case for column names
  });
  return Subscription;
};