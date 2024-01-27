"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Goals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shopping: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      transportation: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      entertainment: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bills: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      clothes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      health: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      education: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      gift: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      savings: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      other: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Goals");
  },
};
