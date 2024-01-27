"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Goal.belongsTo(models.User, { foreignKey: "UserId" });
      // define association here
    }
  }
  Goal.init(
    {
      shopping: { type: DataTypes.INTEGER, defaultValue: 0 },
      transportation: { type: DataTypes.INTEGER, defaultValue: 0 },
      entertainment: { type: DataTypes.INTEGER, defaultValue: 0 },
      bills: { type: DataTypes.INTEGER, defaultValue: 0 },
      clothes: { type: DataTypes.INTEGER, defaultValue: 0 },
      health: { type: DataTypes.INTEGER, defaultValue: 0 },
      education: { type: DataTypes.INTEGER, defaultValue: 0 },
      gift: { type: DataTypes.INTEGER, defaultValue: 0 },
      savings: { type: DataTypes.INTEGER, defaultValue: 0 },
      other: { type: DataTypes.INTEGER, defaultValue: 0 },
      total: { type: DataTypes.INTEGER, defaultValue: 0 },
      UserId: { type: DataTypes.INTEGER, allowNull: false },
      food: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "Goal",
    },
  );
  return Goal;
};
