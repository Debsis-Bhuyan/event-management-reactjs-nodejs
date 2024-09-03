const createResponse = (status, message, data = null, errors = null) => {
  return {
    status,
    message,
    data,
    errors,
  };
};

const successResponse = (res, message, data = null) => {
  return res.status(200).json(createResponse("success", message, data));
};

const errorResponse = (res, message, errors = null, statusCode = 500) => {
  return res
    .status(statusCode)
    .json(createResponse("error", message, null, errors));
};

const validationErrorResponse = (res, message, errors = null) => {
  return res.status(400).json(createResponse("fail", message, null, errors));
};

export { successResponse, errorResponse, validationErrorResponse };
