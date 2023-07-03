const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const NotAuthorizedError = require('../utils/errors/NotAuthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => validator.isEmail(value),
    message: 'Неправильный формат почты',
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function decrypt(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthorizedError('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
