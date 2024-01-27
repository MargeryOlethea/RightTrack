const { User, Category, Spending, Goal } = require("../models");

class CategoryController {
  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      res
        .status(200)
        .json({ message: "Success reading all categories", data: categories });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
