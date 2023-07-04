const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../utils/errors/NotAuthorizedError');
const { SECRET_KEY } = require('../utils/constants');
const { AUTH_REQUIRED } = require('../utils/errorMessages');

const { JWT_SECRET, NODE_ENV } = process.env;
const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError(AUTH_REQUIRED));
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
    );
  } catch (err) {
    next(new NotAuthorizedError(AUTH_REQUIRED));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
