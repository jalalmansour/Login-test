'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuoteItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuoteItem.belongsTo(models.Quote, {
        foreignKey: 'quote_id',
        as: 'quote'
      });
      QuoteItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }
  QuoteItem.init({
    product_type: DataTypes.STRING,
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL(10, 2),
    discount_amount: DataTypes.DECIMAL(10, 2),
    total_price: DataTypes.DECIMAL(10, 2),
    order_index: DataTypes.INTEGER,
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quotes',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming some quote items might not be tied to a specific product
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'QuoteItem',
    tableName: 'quote_items',
    timestamps: false, // Assuming quote items are part of the quote snapshot
  });
  return QuoteItem;
};