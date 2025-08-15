'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscription_plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plan_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plan_type: {
        type: Sequelize.STRING,
        allowNull: false // monthly, quarterly, annual
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      max_users: {
        type: Sequelize.INTEGER
      },
      max_formations: {
        type: Sequelize.INTEGER
      },
      features: {
        type: Sequelize.JSON
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subscription_plans');
  }
};