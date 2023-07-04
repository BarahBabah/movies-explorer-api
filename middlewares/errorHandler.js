const { SERVER_ERROR } = require('../utils/constants');
const { SERVER_ERROR_TEXT } = require('../utils/errorMessages');

const errorHandler = ((err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? SERVER_ERROR_TEXT
      : message,
  });
  next();
});
module.exports = errorHandler;
