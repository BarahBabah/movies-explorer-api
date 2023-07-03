const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const CONFLICT = 409;
const FORBIDDEN = 403;
const NOT_AUTHORIZED = 401;
const DUPLICATE_KEY_ERROR = 11000;
// eslint-disable-next-line no-useless-escape
const patternUrl = /http(s)?:\/\/(www.)?[a-z0-9\.\-]+\/[a-z0-9\.\-_~:\/?#\[\]@!$&'()*+,;=]+/;

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
  FORBIDDEN,
  NOT_AUTHORIZED,
  DUPLICATE_KEY_ERROR,
  patternUrl,
};
