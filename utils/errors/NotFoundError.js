const { NOT_FOUND } = require('../constants');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
};
