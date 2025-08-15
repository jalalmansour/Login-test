'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contract_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quote_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Can be created without a quote
        references: {
          model: 'quotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false // e.g., 'subscription', 'service', 'formation'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false, // e.g., 'draft', 'active', 'suspended', 'terminated'
        defaultValue: 'draft'
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true // Can be open-ended or determined by subscription
      },
      auto_renewal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      renewal_period: {
        type: Sequelize.STRING,
        allowNull: true // e.g., 'monthly', 'annual'
      },
      total_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true // Optional, might be calculated from subscriptions
      },
      signed_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      signed_by_client: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      signed_by_ehc: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('contracts');
  }
};