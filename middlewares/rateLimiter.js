const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 500, // Максимальное количество запросов
  message: 'Превышено количество запросов. Пожалуйста, повторите попытку позже.',
});
module.exports = {
  limiter,
};
