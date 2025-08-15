'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('training_evaluations', {
      evaluation_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      session_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'training_sessions',
          key: 'session_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      participant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      evaluation_type: {
        type: Sequelize.STRING
      },
      evaluation_date: {
        type: Sequelize.DATE
      },
      overall_rating: {
        type: Sequelize.INTEGER
      },
      content_rating: {
        type: Sequelize.INTEGER
      },
      trainer_rating: {
        type: Sequelize.INTEGER
      },
      organization_rating: {
        type: Sequelize.INTEGER
      },
      would_recommend: {
        type: Sequelize.BOOLEAN
      },
      comments: {
        type: Sequelize.TEXT
      },
      skills_acquired: {
        type: Sequelize.JSON
      },
      improvement_suggestions: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('training_evaluations');
  }
};