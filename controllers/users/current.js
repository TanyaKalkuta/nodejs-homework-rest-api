const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const current = async (req, res, next) => {
  const token = req.user.token;
  const user = await User.findOne({ token });
  if (!user) {
    throw new Unauthorized('Not authorized');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
module.exports = current;
