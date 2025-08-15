'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('company_contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER, 
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Assuming contacts should be removed if the company is deleted
      },
      first_name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      email: {
        type: Sequelize.STRING, 
        allowNull: true, // Email might not be mandatory for all contacts
        unique: true
      },
      phone: {
        type: Sequelize.STRING // Consider validating format if needed
      },
      mobile: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING // e.g., "HR Manager", "Training Coordinator"
      },
      department: {
        type: Sequelize.STRING // e.g., "Human Resources", "Sales"
      },
      is_main_contact: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_decision_maker: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_technical_contact: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      notes: {
        type: Sequelize.TEXT // For additional free-form notes
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
    await queryInterface.dropTable('company_contacts');
  }
};