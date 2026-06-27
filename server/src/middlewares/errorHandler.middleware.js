const errorHandler = (err, req, res, next) => {
console.log(err);
  if (res.headerSent) next(err);
  const errorResponse = { success: false };

  if (err.details) errorResponse.details = err.details;
  if (err.message) errorResponse.message = err.message;

  res.status(err.statusCode || 500).json(errorResponse);
};

export default errorHandler