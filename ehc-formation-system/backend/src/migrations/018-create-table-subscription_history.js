'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscription_history', {
      history_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subscription_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscriptions',
          key: 'subscription_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      action: {
        type: Sequelize.STRING // e.g., 'created', 'upgraded', 'downgraded', 'renewed', 'cancelled'
      },
      old_plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscription_plans',
          key: 'plan_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      new_plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscription_plans',
          key: 'plan_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      reason: {
        type: Sequelize.TEXT
      },
      details: {
        type: Sequelize.JSON // Store details about the change
      },
      performed_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subscription_history');
  }
};