// const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
  // когда добавлен, и когда обновлен
);

/* можно так же использовать методы:
userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
*/
const joiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const SubscriptionSchema = Schema({
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
});
const joiSubscriptionSchema = Joi.object({
  subscription: Joi.any().valid('starter', 'pro', 'business'),
});

const User = model('user', userSchema);
const Subscription = model('Subscription', SubscriptionSchema);

module.exports = { User, joiSchema, Subscription, joiSubscriptionSchema };
