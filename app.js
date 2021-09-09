/* eslint-disable spaced-comment */
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { authRouter, contactsRouter } = require('./routes/api');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// настройки для отдачи готовых html страниц
// app.set("view engine", "ejs");
// app.set("views", "./views");

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);
// POST /api/users/signup(register)
// POST /api/users/login(signin)
// GET /api/users/logout(signout)

app.use((_, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  });
});

module.exports = app;
