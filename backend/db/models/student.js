'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {

    }
  }
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};