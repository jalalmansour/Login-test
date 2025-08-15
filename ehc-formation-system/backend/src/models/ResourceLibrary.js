'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResourceLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ResourceLibrary.belongsTo(models.TrainingCourse, {
        foreignKey: 'course_id',
        as: 'trainingCourse'
      });
      ResourceLibrary.belongsTo(models.User, {
        foreignKey: 'uploaded_by',
        as: 'uploader'
      });
      ResourceLibrary.belongsTo(models.TrainingCategory, {
        foreignKey: 'category_id',
        as: 'category'
      });
    }
  }
  ResourceLibrary.init({
    resource_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    resource_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_size: DataTypes.INTEGER,
    duration_minutes: DataTypes.INTEGER,
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'training_categories',
        key: 'category_id'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'training_courses',
        key: 'course_id'
      }
    },
    access_level: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client' // public, client, premium
    },
    download_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rating_average: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ResourceLibrary',
    tableName: 'resource_library',
    timestamps: false, // Using created_at and updated_at manually
    underscored: true,
  });
  return ResourceLibrary;
};