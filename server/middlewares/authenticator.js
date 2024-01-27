const { verifyToken } = require("../utils/jwt");
const { User } = require("../models");

const authenticator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "Unauthorized" };
    }

    const token = authorization.split(" ")[1];

    const payload = verifyToken(token);

    const loggedUser = await User.findByPk(payload.id);

    if (!loggedUser) {
      throw { name: "Unauthorized" };
    }

    req.loginInfo = {
      userId: loggedUser.id,
      username: loggedUser.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticator;
