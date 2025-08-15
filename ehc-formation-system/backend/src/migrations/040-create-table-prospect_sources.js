'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospect_sources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prospect_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'prospects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      source_type: {
        type: Sequelize.STRING
      },
      source_detail: {
        type: Sequelize.STRING
      },
      campaign_id: {
        type: Sequelize.INTEGER,
        // Assuming marketing_campaigns table exists
        references: {
          model: 'marketing_campaigns',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('prospect_sources');
  }
};