"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: "shopping",
      },
      {
        name: "transportation",
      },
      {
        name: "entertainment",
      },
      {
        name: "bills",
      },
      {
        name: "clothes",
      },
      {
        name: "health",
      },
      {
        name: "education",
      },
      {
        name: "gift",
      },
      {
        name: "savings",
      },
      {
        name: "other",
      },
      {
        name: "food",
      },
    ];

    data.forEach(
      (category) => (category.createdAt = category.updatedAt = new Date()),
    );

    await queryInterface.bulkInsert("Categories", data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      restartIdentity: true,
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
