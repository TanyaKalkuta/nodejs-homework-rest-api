const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const updateImg = require('./updateImg');
const verify = require('./verify');
const repeatVerify = require('./repeatVerify');

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateImg,
  verify,
  repeatVerify,
};
