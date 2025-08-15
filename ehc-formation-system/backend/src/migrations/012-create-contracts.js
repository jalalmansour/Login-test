'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contract_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        }
      },
      quote_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'quotes',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      auto_renewal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      renewal_period: {
        type: Sequelize.STRING,
        allowNull: true
      },
      total_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      signed_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      signed_by_client: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      signed_by_ehc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('contracts');
  }
};