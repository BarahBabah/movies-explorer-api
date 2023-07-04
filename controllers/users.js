/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { DUPLICATE_KEY_ERROR, CREATED, OK } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictUserError = require('../utils/errors/ConflictUserError');
const NotFoundError = require('../utils/errors/NotFoundError');
const { SECRET_KEY, JWT_EXPIRES } = require('../utils/constants');
const {
  EMAIL_ALREADY_EXISTS,
  INVALID_USER_CREATION_DATA,
  FAILED_TO_GET_USER_DATA,
  EMAIL_ALREADY_IN_USE,
  INVALID_DATA,
} = require('../utils/errorMessages');

const { JWT_SECRET, NODE_ENV } = process.env;

const createUsers = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    userModel.create({
      name, email, password: hash,
    })
      .then(() => {
        res.status(CREATED).send({
          name, email,
        });
      })
      .catch((err) => {
        if (err.code === DUPLICATE_KEY_ERROR) {
          return next(new ConflictUserError(EMAIL_ALREADY_EXISTS));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequestError(INVALID_USER_CREATION_DATA));
        }
        next(err);
      });
  });
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,

        {
          expiresIn: JWT_EXPIRES,
        },
      );
      res.send({ token });
    }).catch(next);
};

const getUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .orFail(() => { throw new NotFoundError(FAILED_TO_GET_USER_DATA); })
    .then((user) => {
      res.status(OK).send({ email: user.email, name: user.name });
    }).catch((err) => {
      next(err);
    });
};
const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  userModel.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  ).orFail(() => {
    throw new NotFoundError(INVALID_DATA);
  })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA));
      } else if (err.code === DUPLICATE_KEY_ERROR) {
        next(new ConflictUserError(EMAIL_ALREADY_IN_USE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUsers,
  login,
  getUser,
  updateUser,
};
