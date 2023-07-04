const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../utils/joi-validate');

router.get('/', getMovies);

router.post('/', validateMovie, createMovie);

router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
