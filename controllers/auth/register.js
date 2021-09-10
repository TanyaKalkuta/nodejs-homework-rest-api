const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');

const { User } = require('../../models');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already register');
    /* return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
        // message: 'Already register',
      }); */
    /* return res.status(400).json({
         status: "error",
         code: 400,
         message: "Email or password wrong"
        });
        */
  }
  // хешируем пароль:
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashPassword });
  // другой способ добавления юзера с паролем:
  // const newUser = new User({ email });
  // newUser.setPassword(password);
  // await newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    result,
    // user: {
    //   email: user.email,
    //   subscription: user.subscription,
    // },
  });
};

module.exports = register;
