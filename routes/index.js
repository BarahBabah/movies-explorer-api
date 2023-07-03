const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const NotFoundError = require('../utils/errors/NotFoundError');
const { login, createUsers } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../utils/joi-validate');
const auth = require('../middlewares/auth');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUsers);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
