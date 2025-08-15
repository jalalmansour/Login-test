'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trainer.hasMany(models.TrainingSession, {
        foreignKey: 'trainer_id',
        as: 'trainingSessions'
      });
    }
  }
  Trainer.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    specialties: DataTypes.JSON,
    certifications: DataTypes.JSON,
    bio: DataTypes.TEXT,
    hourly_rate: DataTypes.DECIMAL(10, 2),
    is_internal: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Trainer',
    tableName: 'trainers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Trainer;
};