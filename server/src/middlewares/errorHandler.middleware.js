const errorHandler = (err, req, res, next) => {
  if (res.headerSent) next(err);
  const errorResponse = { success: false };

  if (err.details) errorResponse.details = err.details;
  if (err.message) errorResponse.message = err.message;

  res.status(err.statusCode || 500).json(errorResponse);
};

export default errorHandler