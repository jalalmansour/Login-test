'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsToMany(models.TrainingCourse, {
        through: 'TrainingSkill',
        as: 'trainingCourses',
        foreignKey: 'skill_id'
      });
      Skill.belongsToMany(models.User, {
        through: 'UserSkill',
        as: 'users',
        foreignKey: 'skill_id'
      });
    }
  }
  Skill.init({
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    skill_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills',
    timestamps: false,
    underscored: true
  });
  return Skill;
};