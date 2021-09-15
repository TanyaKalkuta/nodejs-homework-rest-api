const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

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
  console.log(defaultImage);
  const newUser = {
    ...req.body,
    password: hashPassword,
    avatarURL: defaultImage,
  };
  const result = await User.create(newUser);

  const id = result._id.toString();
  const dirPath = path.join(usersDir, id);
  await fs.mkdir(dirPath);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    result,
  });
};

module.exports = register;
