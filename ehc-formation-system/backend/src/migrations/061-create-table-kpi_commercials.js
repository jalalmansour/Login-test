'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kpi_commercials', {
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
      mrr: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      churn_rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      new_prospects: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      // Add other KPI columns as needed based on the blueprint's definition
      // For example:
      // win_rate: {
      //   type: Sequelize.DECIMAL(5, 2),
      //   allowNull: true,
      // },
      // average_deal_size: {
      //   type: Sequelize.DECIMAL(10, 2),
      //   allowNull: true,
      // },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Null for global KPIs
        references: {
          model: 'companies', // name of the target table
          key: 'id', // key in the target table that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      calculated_at: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('kpi_commercials');
  }
};