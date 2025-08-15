'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('resource_library', {
      resource_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      resource_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_size: {
        type: Sequelize.INTEGER
      },
      duration_minutes: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'training_categories',
          key: 'category_id'
        }
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'training_courses',
          key: 'course_id'
        }
      },
      access_level: {
        type: Sequelize.STRING
      },
      download_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rating_average: {
        type: Sequelize.FLOAT
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      uploaded_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        }
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
    await queryInterface.dropTable('resource_library');
  }
};