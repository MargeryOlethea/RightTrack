const { User, Category, Spending, Goal } = require("../models");
const { Op } = require("sequelize");
const cloudinary = require("../utils/cloudinary");
const parseReceipt = require("../utils/mindee");
const monthConverter = require("../helpers/monthConverter");

class SpendingController {
  static async userSpending(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      let option = {
        include: [
          {
            model: User,
            where: { id: userId },
            attributes: { exclude: ["password"] },
          },
          Category,
        ],
      };

      let { sort, search, filter, date } = req.query;

      if (sort === "newest") {
        option.order = [["date", "DESC"]];
      }

      if (sort === "biggest") {
        option.order = [["amount", "DESC"]];
      }

      if (search) {
        option.where = { name: { [Op.iLike]: `%${search}%` } };
      }

      if (filter) {
        option.where = { ...option.where, CategoryId: filter };
        const category = await Category.findAll({ where: { id: filter } });

        if (!category || category.length === 0) {
          throw { name: "NotFound" };
        }
      }

      if (!date) {
        const now = new Date();
        const [currentMonth, currentYear] = [
          now.getMonth() + 1,
          now.getFullYear(),
        ];

        date = `${currentYear}-${currentMonth}`;
      }

      const [year, month] = date.split("-");

      const startDate = new Date(`${year}-${month}-01`);

      const endDate = new Date(
        new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1),
      );

      option.where = {
        ...option.where,
        date: {
          [Op.between]: [startDate, endDate],
        },
      };

      const { count, rows } = await Spending.findAndCountAll(option);

      res.status(200).json({
        message: "Success reading data",
        month: monthConverter(date),
        data: rows,
        totalData: count,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createSpending(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      const { name, description, amount, date, CategoryId } = req.body;

      const newSpending = await Spending.create({
        name,
        amount,
        description,
        date,
        CategoryId,
        UserId: userId,
      });

      res.status(201).json({
        message: `Success created spending '${newSpending.name}'`,
        data: newSpending,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findSpendingById(req, res, next) {
    try {
      const { id } = req.params;
      const spending = await Spending.findByPk(id);
      if (!spending) {
        throw { name: "NotFound" };
      }

      res
        .status(200)
        .json({ message: `Success find spending by id ${id}`, data: spending });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSpendingById(req, res, next) {
    try {
      const { id } = req.params;
      const spending = await Spending.findByPk(id);
      if (!spending) {
        throw { name: "NotFound" };
      }

      await spending.destroy();

      res
        .status(200)
        .json({ message: `Success delete spending '${spending.name}'` });
    } catch (error) {
      next(error);
    }
  }

  static async updateSpendingById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, amount, date, CategoryId } = req.body;
      const spending = await Spending.findByPk(id);
      if (!spending) {
        throw { name: "NotFound" };
      }

      await spending.update({ name, description, amount, date, CategoryId });

      res
        .status(200)
        .json({ message: `Success update spending by id '${spending.id}'` });
    } catch (error) {
      next(error);
    }
  }

  static async createSpendingByPhoto(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      // CLOUDINARY
      const image = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) {
              reject({ name: "UploadError" });
            } else {
              resolve(result);
            }
          })
          .end(req.file.buffer);
      });

      // MINDEE
      const { data } = await parseReceipt(image.secure_url);

      const pageInfo = data.inference.pages[0];

      const lineItemsString = pageInfo.prediction.lineItems.map(
        (item) =>
          `${item.description} (${item.quantity}) (${item.unitPrice}) -- (${item.totalAmount})`,
      );

      const allLineItems = lineItemsString.join(`, `);

      const result = {
        name:
          pageInfo.prediction.supplierName.value || `receipt of ${new Date()}`,
        amount: Math.round(pageInfo.prediction.totalAmount.value),
        description: allLineItems,
        date: pageInfo.prediction.date.value,
      };

      // CREATE NEW SPENDING
      const newSpending = await Spending.create({
        name: result.name,
        amount: result.amount,
        description: result.description,
        date: result.date,
        UserId: userId,
        CategoryId: 10,
      });

      res.status(201).json({
        message: `Success created spending '${newSpending.name}'`,
        data: newSpending,
      });
    } catch (error) {
      next(error);
    }
  }

  static async spendingSummary(req, res, next) {
    try {
      const { userId, username } = req.loginInfo;

      // DAPETIN GOAL
      let goal = await Goal.findOne({ where: { UserId: userId } });

      if (!goal) {
        goal = {
          shopping: 0,
          transportation: 0,
          entertainment: 0,
          bills: 0,
          clothes: 0,
          health: 0,
          education: 0,
          gift: 0,
          savings: 0,
          other: 0,
          total: 0,
          food: 0,
        };
      }

      // NGURUS BUAT DATE
      let option = {
        include: [Category],
        where: { UserId: userId },
      };

      let { date } = req.query;

      if (!date) {
        const now = new Date();
        const [currentMonth, currentYear] = [
          now.getMonth() + 1,
          now.getFullYear(),
        ];

        date = `${currentYear}-${currentMonth}`;
      }

      const [year, month] = date.split("-");

      const startDate = new Date(`${year}-${month}-01`);

      const endDate = new Date(
        new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1),
      );

      option.where = {
        ...option.where,
        date: {
          [Op.between]: [startDate, endDate],
        },
      };

      // DAPETIN SPENDING
      const spending = await Spending.findAll(option);

      // OLAH SUMMARY
      // SUMMARY TOTAL
      let summary = {
        shopping: 0,
        food: 0,
        transportation: 0,
        entertainment: 0,
        bills: 0,
        clothes: 0,
        health: 0,
        education: 0,
        gift: 0,
        savings: 0,
        other: 0,
        total: 0,
      };
      spending.forEach((el) => {
        switch (el.Category.name) {
          case "shopping":
            summary.shopping += +el.amount;
            summary.total += +el.amount;
            break;

          case "food":
            summary.food += +el.amount;
            summary.total += +el.amount;
            break;

          case "transportation":
            summary.transportation += +el.amount;
            summary.total += +el.amount;
            break;

          case "entertainment":
            summary.entertainment += +el.amount;
            summary.total += +el.amount;
            break;

          case "bills":
            summary.bills += +el.amount;
            summary.total += +el.amount;
            break;

          case "clothes":
            summary.clothes += +el.amount;
            summary.total += +el.amount;
            break;

          case "health":
            summary.health += +el.amount;
            summary.total += +el.amount;
            break;

          case "education":
            summary.education += +el.amount;
            summary.total += +el.amount;
            break;

          case "gift":
            summary.gift += +el.amount;
            summary.total += +el.amount;
            break;

          case "savings":
            summary.savings += +el.amount;
            summary.total += +el.amount;
            break;

          case "other":
            summary.other += +el.amount;
            summary.total += +el.amount;
            break;

          default:
            break;
        }
      });
      let summaryArray = Object.keys(summary);

      // SUMMARY PERGOAL
      let summaryPerGoal = {};

      summaryArray.forEach((category) => {
        summaryPerGoal[category] = Math.round(
          (summary[category] / goal[category]) * 100,
        );
      });

      //PERCENTAGE
      let percentagePerCategory = {};
      const totalAmount = summary.total;

      summaryArray.forEach((category) => {
        if (category !== "total") {
          percentagePerCategory[category] = Math.round(
            (summary[category] / totalAmount) * 100,
          );
        }
      });

      res.status(200).json({
        message: `Success read user ${username} summary`,
        month: monthConverter(date),
        totalSpending: summary,
        summaryPerGoal: summaryPerGoal,
        summaryPerTotal: percentagePerCategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SpendingController;
