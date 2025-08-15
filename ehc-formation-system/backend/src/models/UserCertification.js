'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCertification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCertification.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      UserCertification.belongsTo(models.Certification, {
        foreignKey: 'certification_id',
      });
      UserCertification.belongsTo(models.TrainingCourse, {
        foreignKey: 'course_id',
      });
    }
  }
  UserCertification.init({
    user_certification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    certification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'certifications',
        key: 'certification_id'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'training_courses',
        key: 'course_id'
      }
    },
    obtained_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    certificate_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'expired', 'revoked'),
      allowNull: false,
      defaultValue: 'active'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'UserCertification',
    tableName: 'user_certifications',
    timestamps: false, // Assuming no created_at/updated_at based on schema
  });
  return UserCertification;
};