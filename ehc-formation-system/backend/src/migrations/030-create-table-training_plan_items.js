'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('training_plan_items', {
      item_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      plan_id: {
        type: Sequelize.UUID,
        references: {
          model: 'annual_training_plans',
          key: 'plan_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course_id: {
        type: Sequelize.UUID,
        references: {
          model: 'training_courses',
          key: 'course_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      target_audience: {
        type: Sequelize.STRING
      },
      planned_quarter: {
        type: Sequelize.STRING // e.g., 'Q1 2025', 'Q2 2025'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('training_plan_items');
  }
};