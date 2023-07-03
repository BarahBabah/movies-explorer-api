const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../utils/errors/NotAuthorizedError');

const { JWT_SECRET, NODE_ENV } = process.env;
const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError('Необходима авторизация!'));
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY',
    );
  } catch (err) {
    next(new NotAuthorizedError('Необходима авторизация!'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
