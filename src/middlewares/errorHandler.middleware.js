function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_SERVER_ERROR",
  };

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
