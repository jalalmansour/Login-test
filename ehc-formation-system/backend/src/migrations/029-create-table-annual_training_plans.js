'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('annual_training_plans', {
      plan_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'companies',
          key: 'company_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_budget: {
        type: Sequelize.DECIMAL(10, 2),
      },
      used_budget: {
        type: Sequelize.DECIMAL(10, 2),
      },
      objectives: {
        type: Sequelize.TEXT,
      },
      priority_areas: {
        type: Sequelize.JSON,
      },
      status: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      approved_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('annual_training_plans');
  }
};