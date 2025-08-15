'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainingCategory.belongsTo(models.TrainingCategory, {
        as: 'ParentCategory',
        foreignKey: 'parent_category_id'
      });
      TrainingCategory.hasMany(models.TrainingCategory, {
        as: 'Subcategories',
        foreignKey: 'parent_category_id'
      });
      TrainingCategory.hasMany(models.TrainingCourse, {
        as: 'TrainingCourses',
        foreignKey: 'category_id'
      });
    }
  }
  TrainingCategory.init({
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'TrainingCategories',
        key: 'category_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    description: {
      type: DataTypes.TEXT
    },
    color_code: {
      type: DataTypes.STRING
    },
    icon: {
      type: DataTypes.STRING
    },
    sort_order: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'TrainingCategory',
    tableName: 'training_categories',
    timestamps: false,
  });
  return TrainingCategory;
};