"use strict";

const { hashPassword } = require("../utils/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        username: "user1",
        email: "user1@mail.com",
        password: hashPassword("12345678"),
      },
      {
        username: "user2",
        email: "user2@mail.com",
        password: hashPassword("12345678"),
      },
    ];

    data.forEach((user) => (user.createdAt = user.updatedAt = new Date()));

    await queryInterface.bulkInsert("Users", data, {});
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
    await queryInterface.bulkDelete("Users", null, { restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
