require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/bitfilmsdb' } = process.env;
const app = express();
app.use(cors());

mongoose.connect(MONGO_URL);

mongoose.set({ runValidators: true });

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
});
