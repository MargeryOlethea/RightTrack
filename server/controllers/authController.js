const { User, Category, Spending, Goal } = require("../models");
const { comparePassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, username, password } = req.body;

      const newUser = await User.create({ email, username, password });

      res.status(201).json({
        message: `Successfully created account ${newUser.email}`,
        data: {
          id: newUser.id,
          username: newUser.username,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({
        where: { username: { [Op.iLike]: username } },
      });

      if (!foundUser || !comparePassword(password, foundUser.password)) {
        throw { name: "InvalidCredentials" };
      }

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
      };

      const token = createToken(payload);

      res.status(200).json({
        message: `${foundUser.username} successfully login!`,
        data: {
          username: foundUser.username,
          access_token: `${token}`,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;

      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          username: `${payload.given_name}${payload.family_name}`,
        },
        defaults: {
          email: payload.email,
          username: `${payload.given_name}${payload.family_name}`,
          password: "password_google",
        },
        hooks: false,
      });

      const access_token = createToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      res.status(200).json({
        message: `${user.username} successfully login!`,
        data: {
          username: user.username,
          access_token: access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
