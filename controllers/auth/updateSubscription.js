const { User } = require('../../models');

const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true },
    );
    if (!updateUser) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({
      status: 'success',
      code: 200,
      user: {
        email: updateUser.email,
        subscription: updateUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
