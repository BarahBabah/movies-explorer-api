const movieModel = require('../models/movie');
const { CREATED, OK } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const getMovies = (req, res, next) => {
  movieModel.find({})
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  movieModel.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для создания карточки'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  movieModel.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильма с указанным _id не найдена.');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужой фильм.');
      }

      return movieModel.findByIdAndDelete(req.params._id);
    })
    .then((deletedMovie) => {
      res.status(OK).send(deletedMovie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
