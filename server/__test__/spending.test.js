const request = require("supertest");
const app = require("../app");
const { createToken } = require("../utils/jwt");
const { sequelize } = require("../models");
const { hashPassword } = require("../utils/bcrypt");

let token = "";
beforeAll(async () => {
  // SEEDING USER
  const dataUser = [
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

  dataUser.forEach((user) => (user.createdAt = user.updatedAt = new Date()));

  await sequelize.queryInterface.bulkInsert("Users", dataUser, {});

  const payload = {
    id: 1,
    username: "user1",
    email: "user1@mail.com",
  };

  token = createToken(payload);

  // SEEDING CATEGORY
  const dataCategory = [
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

  dataCategory.forEach(
    (category) => (category.createdAt = category.updatedAt = new Date()),
  );

  await sequelize.queryInterface.bulkInsert("Categories", dataCategory, {});

  // SEEDING SPENDING
  const dataSpending = require("../data/spendings.json");

  dataSpending.forEach(
    (spending) => (spending.createdAt = spending.updatedAt = new Date()),
  );

  await sequelize.queryInterface.bulkInsert("Spendings", dataSpending, {});
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Spendings", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });

  await sequelize.queryInterface.bulkDelete("Categories", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });

  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

// CREATE
describe("POST /userspendings", () => {
  describe("POST /userspendings - Succeed", () => {
    it("success create spending", async () => {
      const body = {
        name: "test spending",
        amount: 50000,
        description: "test spending",
        date: "2023-01-20",
        CategoryId: 1,
      };

      const response = await request(app)
        .post("/userspendings")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `Success created spending '${body.name}'`,
      );
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });
  });

  describe("POST /userspendings - Error", () => {
    it("creating spending without logging in", async () => {
      const body = {
        name: "test spending",
        amount: 50000,
      };

      const response = await request(app).post("/userspendings").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", `Please log in first!`);
    });

    it("creating spending with invalid token", async () => {
      const body = {
        name: "test spending",
        amount: 50000,
      };

      const response = await request(app)
        .post("/userspendings")
        .send(body)
        .set("Authorization", `test`);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", `Please log in first!`);
    });

    it("no name input", async () => {
      const body = {
        amount: 50000,
      };

      const response = await request(app)
        .post("/userspendings")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", `Name is required.`);
    });

    it("no amount input", async () => {
      const body = {
        name: "test spending",
      };

      const response = await request(app)
        .post("/userspendings")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", `Amount is required.`);
    });

    it("CategoryId not provided", async () => {
      const body = {
        name: "test spending",
        amount: 50000,
      };

      const response = await request(app)
        .post("/userspendings")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", `Category is required.`);
    });

    it("CategoryId out of range", async () => {
      const body = {
        name: "test spending",
        amount: 50000,
        CategoryId: 12,
      };

      const response = await request(app)
        .post("/userspendings")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `Category/User is not available.`,
      );
    });
  });
});
