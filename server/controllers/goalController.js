const { User, Category, Spending, Goal } = require("../models");
class GoalController {
  static async createGoal(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      const goal = await Goal.findOne({ where: { UserId: userId } });

      if (goal) {
        throw { name: "DuplicateGoal" };
      }
      const {
        shopping,
        transportation,
        entertainment,
        bills,
        clothes,
        health,
        education,
        gift,
        savings,
        other,
        food,
      } = req.body;

      const total =
        +shopping +
        +transportation +
        +entertainment +
        +bills +
        +clothes +
        +health +
        +education +
        +gift +
        +savings +
        +other +
        +food;

      const newGoal = await Goal.create({
        shopping: +shopping,
        transportation: +transportation,
        entertainment: +entertainment,
        bills: +bills,
        clothes: +clothes,
        health: +health,
        education: +education,
        gift: +gift,
        savings: +savings,
        other: +other,
        food: +food,
        total,
        UserId: userId,
      });

      res.status(201).json({ message: `Success created your goal`, newGoal });
    } catch (error) {
      next(error);
    }
  }

  static async updateGoal(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const goal = await Goal.findOne({ where: { UserId: userId } });
      const {
        shopping,
        transportation,
        entertainment,
        bills,
        clothes,
        health,
        education,
        gift,
        savings,
        other,
        food,
      } = req.body;

      const total =
        +shopping +
        +transportation +
        +entertainment +
        +bills +
        +clothes +
        +health +
        +education +
        +gift +
        +savings +
        +other +
        +food;

      if (!goal) {
        throw { name: "NotFound" };
      }

      await goal.update({
        shopping: +shopping,
        transportation: +transportation,
        entertainment: +entertainment,
        bills: +bills,
        clothes: +clothes,
        health: +health,
        education: +education,
        gift: +gift,
        savings: +savings,
        other: +other,
        food: +food,
        total,
        UserId: userId,
      });

      res.status(200).json({ message: `Success updated your goal.` });
    } catch (error) {
      next(error);
    }
  }

  static async userGoal(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const goal = await Goal.findOne({ where: { UserId: userId } });

      res.status(200).json({ message: `Success read your goal.`, goal });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GoalController;
