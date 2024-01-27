"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spending.belongsTo(models.User, { foreignKey: "UserId" });
      Spending.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Spending.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required.",
          },
          notEmpty: {
            msg: "Name is required.",
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Amount is required.",
          },
          notEmpty: {
            msg: "Amount is required.",
          },
        },
      },
      description: DataTypes.STRING,
      date: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      UserId: DataTypes.INTEGER,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category is required.",
          },
          notEmpty: {
            msg: "Category is required.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Spending",
    },
  );
  return Spending;
};
