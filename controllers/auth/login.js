const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequest } = require('http-errors');

const { User } = require('../../models');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest('Wrong email');
  }
  // if(!user || !user.comparePassword(password)) {
  //     return res.status(400).json({
  //         status: "error",
  //         code: 400,
  //         message: "Wrong email or password"
  //     });
  // }
  /* if (!user) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong email',
      });
    } */
  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);
  // const compareResult = user.comparePassword(password);
  if (!compareResult) {
    throw new BadRequest('Wrong password');
    // return res.status(400).json({
    //   status: 'error',
    //   code: 400,
    //   message: 'Wrong password',
    // });
  }

  const payload = {
    id: user._id,
  };
  const { SECRET_KEY } = process.env;

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
