const { Schema, Types, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
    },
    image: {
      type: String,
      default: '',
      // required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'user',
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
  /* когда добавлен, и когда обновлен */
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  image: Joi.string(),
  favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
};
