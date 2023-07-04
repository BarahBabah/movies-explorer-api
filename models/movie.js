const mongoose = require('mongoose');
const validator = require('validator');
const { INVALID_IMAGE_URL, INVALID_POSTER_URL, INVALID_TRAILER_URL } = require('../utils/errorMessages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: (value) => validator.isURL(value),
    message: INVALID_IMAGE_URL,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: (value) => validator.isURL(value),
    message: INVALID_TRAILER_URL,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (value) => validator.isURL(value),
    message: INVALID_POSTER_URL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
