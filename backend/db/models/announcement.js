'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Announcement.init({
    user_id: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    msg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Announcement',
  });
  return Announcement;
};