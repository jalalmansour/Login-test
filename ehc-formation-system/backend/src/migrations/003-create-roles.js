'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      role_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_system_role: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add predefined roles
    await queryInterface.bulkInsert('roles', [{
      role_name: 'SuperAdmin',
      description: 'Full system access',
      is_system_role: true
    }, {
      role_name: 'EHC_Admin',
      description: 'Admin access for EHC staff',
      is_system_role: true
    }, {
      role_name: 'Client_Admin',
      description: 'Admin access for client companies',
      is_system_role: false
    }, {
      role_name: 'RRH',
      description: 'Responsible of Human Resources',
      is_system_role: false
    }, {
      role_name: 'RF',
      description: 'Responsable Formation',
      is_system_role: false
    }, {
      role_name: 'Manager',
      description: 'Team Manager with approval rights',
      is_system_role: false
    }, {
      role_name: 'Employee',
      description: 'Standard employee user',
      is_system_role: false
    }, {
      role_name: 'Trainer',
      description: 'Formation trainer',
      is_system_role: false
    }, {
      role_name: 'Support',
      description: 'Customer support agent',
      is_system_role: false
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};