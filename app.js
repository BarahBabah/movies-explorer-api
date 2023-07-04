require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/rateLimiter');
const { MONGO_URL_DEV } = require('./utils/constants');

const { NODE_ENV, MONGO_URL } = process.env;
const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);

mongoose.set({ runValidators: true });

app.use(express.json());

app.use(requestLogger);
app.use(limiter);
app.use('/api', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
