'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('retention_offers', {
      offer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cancellation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cancellations',
          key: 'cancellation_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      offer_type: {
        type: Sequelize.STRING
      },
      offer_details: {
        type: Sequelize.TEXT
      },
      value: {
        type: Sequelize.DECIMAL(10, 2)
      },
      valid_until: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      created_by: {
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
        type: Sequelize.DATE
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
    await queryInterface.dropTable('retention_offers');
  }
};