'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.Company, {
        foreignKey: 'company_id',
      });
      Contract.belongsTo(models.Quote, {
        foreignKey: 'quote_id',
      });
      Contract.hasMany(models.Subscription, {
        foreignKey: 'contract_id',
      });
      Contract.hasMany(models.ContractDocument, {
        foreignKey: 'contract_id',
      });
    }
  }
  Contract.init({
    contract_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    contract_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Can be created without a quote
      references: {
        model: 'quotes',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'draft'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    auto_renewal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    renewal_period: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    signed_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    signed_by_client: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    signed_by_ehc: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'Contract',
    tableName: 'contracts',
    timestamps: false, // Adjust based on your migration timestamps setup
    underscored: true,
  });
  return Contract;
};