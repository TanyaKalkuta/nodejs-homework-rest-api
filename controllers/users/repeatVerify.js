const { BadRequest } = require('http-errors');
const { User } = require('../../models');
const { sendMail } = require('../../utils');

const repeatVerify = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequest('missing required field email');
    }
    const { verify, verifyToken } = user;
    if (verify) {
      throw new BadRequest('Verification has already been passed');
    }

    const data = {
      to: email,
      subject: 'Подтверждение регистрации на сайте',
      html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Подтвердите регистрацию</a>`,
    };

    await sendMail(data);

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Verification email sent',
      html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Подтвердите регистрацию</a>`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = repeatVerify;
