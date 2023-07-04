const movieModel = require('../models/movie');
const { CREATED, OK } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const {
  INVALID_MOVIE_DATA, INVALID_DATA, CANNOT_DELETE_OTHER_USER_MOVIE, MOVIE_NOT_FOUND,
} = require('../utils/errorMessages');

const getMovies = (req, res, next) => {
  const owner = req.user;
  movieModel.find({ owner })
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
        next(new BadRequestError(INVALID_MOVIE_DATA));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  movieModel.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(CANNOT_DELETE_OTHER_USER_MOVIE);
      }

      return movieModel.findByIdAndDelete(req.params._id);
    })
    .then((deletedMovie) => {
      res.status(OK).send(deletedMovie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INVALID_DATA));
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
