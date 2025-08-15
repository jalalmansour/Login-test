'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_notes', {
      credit_note_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      invoice_id: {
        type: Sequelize.UUID,
        references: {
          model: 'invoices',
          key: 'invoice_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      credit_note_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      reason: {
        type: Sequelize.TEXT
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('draft', 'issued', 'applied'),
        defaultValue: 'draft'
      },
      created_by: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('credit_notes');
  }
};