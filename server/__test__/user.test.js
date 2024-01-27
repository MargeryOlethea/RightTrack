const request = require("supertest");
const app = require("../app");
const { createToken } = require("../utils/jwt");
const { sequelize } = require("../models");
const { hashPassword } = require("../utils/bcrypt");

let token = "";
beforeAll(async () => {
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

  await sequelize.queryInterface.bulkInsert("Users", data, {});

  const payload = {
    id: 1,
    username: "user1",
    email: "user1@mail.com",
  };

  token = createToken(payload);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
  });
});

// LOGIN TEST
describe("POST /login", () => {
  describe("POST /login - succeed", () => {
    it("login successfully", async () => {
      const body = { username: "user1", password: "12345678" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `${body.username} successfully login!`,
      );
      expect(response.body.data).toHaveProperty("access_token");
      expect(response.body.data).toHaveProperty("username", body.username);
    });
  });

  describe("POST /login - error", () => {
    it("no username input", async () => {
      const body = { username: "", password: "12345678" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `Invalid username or password.`,
      );
    });

    it("no password input", async () => {
      const body = { username: "user1", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `Invalid username or password.`,
      );
    });

    it("wrong username input", async () => {
      const body = { username: "wrongaccount", password: "12345678" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `Invalid username or password.`,
      );
    });

    it("wrong password input", async () => {
      const body = { username: "user1", password: "wrongpassword" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        `Invalid username or password.`,
      );
    });
  });
});

// REGISTER TEST
describe("POST /register", () => {
  it("register user successfully", async () => {
    const body = {
      email: "newuser@gmail.com",
      username: "user2",
      password: "asdfasdf",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Successfully created account ${body.email}`,
    );
    expect(response.body).toHaveProperty("data", expect.any(Object));
  });

  it("no email input", async () => {
    const body = {
      username: "user2",
      password: "asdfasdf",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Email is required.`);
  });

  it("no password input", async () => {
    const body = {
      email: "newuser@gmail.com",
      username: "user2",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Password is required.`);
  });

  it("empty email input", async () => {
    const body = {
      email: "",
      username: "user2",
      password: "asdfasdf",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Email is required.`);
  });

  it("empty password input", async () => {
    const body = {
      email: "newuser@gmail.com",
      username: "user2",
      password: "",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Password is required.`);
  });

  it("already registered user", async () => {
    const body = {
      email: "newuser@gmail.com",
      username: "user2",
      password: "asdfasdf",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Username is already registered.`,
    );
  });

  it("wrong email format", async () => {
    const body = {
      email: "user",
      username: "user2",
      password: "asdfasdf",
    };
    const response = await request(app).post("/register").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid email format.`);
  });
});
