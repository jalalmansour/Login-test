'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceItem.belongsTo(models.Invoice, {
        foreignKey: 'invoice_id',
        as: 'invoice',
      });
      InvoiceItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
    }
  }
  InvoiceItem.init({
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL(10, 2),
    discount_percent: DataTypes.DECIMAL(5, 2),
    line_total: DataTypes.DECIMAL(10, 2),
    tax_rate: DataTypes.DECIMAL(5, 2),
    period_start: DataTypes.DATE,
    period_end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'InvoiceItem',
    tableName: 'invoice_items',
    underscored: true,
  });
  return InvoiceItem;
};