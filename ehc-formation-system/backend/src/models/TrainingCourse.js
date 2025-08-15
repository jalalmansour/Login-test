'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainingCourse.belongsTo(models.TrainingCategory, {
        foreignKey: 'category_id',
        as: 'category'
      });
      TrainingCourse.belongsToMany(models.Skill, {
        through: models.TrainingSkill,
        foreignKey: 'course_id',
        otherKey: 'skill_id',
        as: 'skills'
      });
      TrainingCourse.hasMany(models.TrainingSession, {
        foreignKey: 'course_id',
        as: 'sessions'
      });
      TrainingCourse.hasMany(models.ResourceLibrary, {
        foreignKey: 'course_id',
        as: 'resources'
      });
      TrainingCourse.hasMany(models.TrainingRequest, {
        foreignKey: 'course_id',
        as: 'requests'
      });
      TrainingCourse.hasMany(models.TrainingEvaluation, {
        foreignKey: 'course_id',
        as: 'evaluations'
      });
      TrainingCourse.hasMany(models.UserCertification, {
        foreignKey: 'course_id',
        as: 'userCertifications'
      });
    }
  }
  TrainingCourse.init({
    course_code: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    level: DataTypes.STRING,
    duration_hours: DataTypes.FLOAT,
    max_participants: DataTypes.INTEGER,
    prerequisites: DataTypes.TEXT,
    objectives: DataTypes.JSON,
    is_active: DataTypes.BOOLEAN,
    is_certification_eligible: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL(10, 2),
    created_by: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TrainingCourse',
    tableName: 'training_courses',
    underscored: true,
    timestamps: false,
  });
  return TrainingCourse;
};