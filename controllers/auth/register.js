const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');

const { User } = require('../../models');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already register');
  }
  /* хешируем пароль: */
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashPassword });

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    // result,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
