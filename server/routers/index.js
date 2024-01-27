const AuthController = require("../controllers/authController");
const CategoryController = require("../controllers/categoryController");
const GoalController = require("../controllers/goalController");
const SpendingController = require("../controllers/spendingController");
const authenticator = require("../middlewares/authenticator");
const singleUpload = require("../middlewares/multer");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("hello world!");
});
router.post("/login", AuthController.login);
router.post("/google-login", AuthController.googleLogin);
router.post("/register", AuthController.register);

router.use(authenticator);

router.get("/userspendings", SpendingController.userSpending);
router.post("/userspendings", SpendingController.createSpending);
router.post(
  "/userspendings-photo",
  singleUpload,
  SpendingController.createSpendingByPhoto,
);
router.get("/userspendings/:id", SpendingController.findSpendingById);
router.put("/userspendings/:id", SpendingController.updateSpendingById);
router.delete("/userspendings/:id", SpendingController.deleteSpendingById);
router.post("/goal", GoalController.createGoal);
router.get("/goal", GoalController.userGoal);
router.put("/goal", GoalController.updateGoal);
router.get("/categories", CategoryController.readCategories);
router.get("/summary", SpendingController.spendingSummary);

module.exports = router;
