/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { DUPLICATE_KEY_ERROR, CREATED, OK } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictUserError = require('../utils/errors/ConflictUserError');
const NotFoundError = require('../utils/errors/NotFoundError');

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
          return next(new ConflictUserError('Пользователь с таким email уже существует'));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Некорректные данные при создании пользователя'));
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
        NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY',

        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    }).catch(next);
};

const getUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Не удалось получить данные пользователя'); })
    .then((user) => {
      res.status(OK).send(user);
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
    throw new NotFoundError('Переданы некорректные данные');
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
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
