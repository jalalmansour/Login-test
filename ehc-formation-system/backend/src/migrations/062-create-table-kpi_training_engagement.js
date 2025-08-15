'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kpi_training_engagement', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Null for global KPIs
        references: {
          model: 'companies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      total_users_trained: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_sessions_completed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      average_satisfaction_score: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0.00,
      },
      completion_rate: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0.00,
      },
      average_quiz_score: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0.00,
      },
      resources_accessed_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      certifications_obtained_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kpi_training_engagement');
  }
};