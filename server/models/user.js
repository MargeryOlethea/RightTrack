"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../utils/bcrypt");
const capitalizeFirstLetter = require("../helpers/capitalizeFirstLetter");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Goal, { foreignKey: "UserId" });
      User.hasMany(models.Spending, { foreignKey: "UserId" });
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username is required.",
          },
          notEmpty: {
            msg: "Username is required.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required.",
          },
          notEmpty: {
            msg: "Email is required.",
          },
          isEmail: {
            msg: "Invalid email format.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required.",
          },
          notEmpty: {
            msg: "Password is required.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
    user.username = capitalizeFirstLetter(user.username);
  });
  return User;
};
