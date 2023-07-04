// movies
const INVALID_MOVIE_DATA = 'Переданы некорректные данные для добавления фильма';
const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';
const CANNOT_DELETE_OTHER_USER_MOVIE = 'Нельзя удалить чужой фильм';
const INVALID_DATA = 'Переданы некорректные данные';
// users
const EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже существует';
const INVALID_USER_CREATION_DATA = 'Некорректные данные при создании пользователя';
const FAILED_TO_GET_USER_DATA = 'Не удалось получить данные пользователя';
const EMAIL_ALREADY_IN_USE = 'Email уже используется';
// auth
const AUTH_REQUIRED = 'Необходима авторизация!';
// errorHandler
const SERVER_ERROR_TEXT = 'На сервере произошла ошибка';
// rateLimiter
const RATE_LIMIT_EXCEEDED = 'Превышено количество запросов. Пожалуйста, повторите попытку позже.';
// models movie
const INVALID_IMAGE_URL = 'Пожалуйста, предоставьте ссылку на изображение в формате URL.';
const INVALID_TRAILER_URL = 'Пожалуйста, предоставьте ссылку на трейлер в формате URL.';
const INVALID_POSTER_URL = 'Пожалуйста, предоставьте ссылку на миниатюрное изображение постера к фильму в формате URL.';
// models user
const INVALID_EMAIL_FORMAT = 'Неправильный формат почты';
const INVALID_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
// router
const PAGE_NOT_FOUND = 'Страница не найдена';
module.exports = {
  INVALID_MOVIE_DATA,
  MOVIE_NOT_FOUND,
  CANNOT_DELETE_OTHER_USER_MOVIE,
  INVALID_DATA,

  EMAIL_ALREADY_EXISTS,
  INVALID_USER_CREATION_DATA,
  FAILED_TO_GET_USER_DATA,
  EMAIL_ALREADY_IN_USE,

  AUTH_REQUIRED,

  SERVER_ERROR_TEXT,

  RATE_LIMIT_EXCEEDED,

  INVALID_IMAGE_URL,
  INVALID_POSTER_URL,
  INVALID_TRAILER_URL,

  INVALID_EMAIL_FORMAT,
  INVALID_EMAIL_OR_PASSWORD,

  PAGE_NOT_FOUND,
};
