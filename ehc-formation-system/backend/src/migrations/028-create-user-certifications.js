'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_certifications', {
      user_certification_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      certification_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'certifications',
          key: 'certification_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'training_courses',
          key: 'course_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      obtained_date: {
        type: Sequelize.DATE
      },
      expiry_date: {
        type: Sequelize.DATE
      },
      certificate_number: {
        type: Sequelize.STRING
      },
      file_path: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('active', 'expired', 'revoked')
      },
      notes: {
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
    await queryInterface.dropTable('user_certifications');
  }
};