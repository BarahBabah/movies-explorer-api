const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const NotFoundError = require('../utils/errors/NotFoundError');
const { login, createUsers } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../utils/joi-validate');
const auth = require('../middlewares/auth');
const { PAGE_NOT_FOUND } = require('../utils/errorMessages');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUsers);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
