const errorHandler = (error, req, res, next) => {
  console.log(error.name);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (error.name === "SequelizeValidationError") {
    statusCode = 400;
    message = error.errors[0].message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Username is already registered.";
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Category/User is not available.";
  }

  if (error.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Invalid input.";
  }

  if (error.name === "TypeError") {
    statusCode = 400;
    message = "Invalid input type.";
  }

  if (error.name === "UploadError") {
    statusCode = 400;
    message = "Failed to upload photo.";
  }

  if (error.name === "MulterError") {
    statusCode = 400;
    message = "Failed to upload photo.";
  }

  if (error.name === "ReceiptError") {
    statusCode = 400;
    message = "Failed to process receipt.";
  }

  if (error.name === "InvalidCredentials") {
    statusCode = 401;
    message = "Invalid username or password.";
  }

  if (error.name === "Unauthorized") {
    statusCode = 401;
    message = "Please log in first!";
  }

  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Please log in first!";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired!";
  }

  if (error.name === "DuplicateGoal") {
    statusCode = 403;
    message = "You already created your goal.";
  }

  if (error.name === "NotFound") {
    statusCode = 404;
    message = "Data not found.";
  }

  res.status(statusCode).json({ code: statusCode, message: message });
};

module.exports = errorHandler;
