const rateLimiter = require('express-rate-limit');
const { RATE_LIMIT_EXCEEDED } = require('../utils/errorMessages');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 500, // Максимальное количество запросов
  message: RATE_LIMIT_EXCEEDED,
});
module.exports = {
  limiter,
};
