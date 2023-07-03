const { NOT_AUTHORIZED } = require('../constants');

module.exports = class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED;
  }
};
