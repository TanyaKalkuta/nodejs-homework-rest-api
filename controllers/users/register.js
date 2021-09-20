const fs = require('fs').promises;
const { v4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { sendMail } = require('../../utils');
const { User } = require('../../models');

const usersDir = path.join(__dirname, '../../', 'public/avatars');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already register');
  }
  /* хешируем пароль: */
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const defaultImage = gravatar.url(req.body.email, { protocol: 'http' });

  const newUser = {
    ...req.body,
    password: hashPassword,
    verifyToken: v4(),
    avatarURL: defaultImage,
  };
  const { verifyToken } = newUser;
  const data = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Подтвердите регистрацию</a>`,
  };

  await sendMail(data);

  const result = await User.create(newUser);

  const id = result._id.toString();
  const avatarPath = path.join(usersDir, id);
  await fs.mkdir(avatarPath);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Подтвердите регистрацию</a>`,
    result,
  });
};

module.exports = register;
