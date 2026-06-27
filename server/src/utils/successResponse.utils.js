const sendResponse = ( res, statusCode, message, data ) => {
  const response = {
    success: true,
  };
  if (message) response.message = message;
  if (data) response.data = data;

  res.status(statusCode || 500).json(response);
};

export default sendResponse