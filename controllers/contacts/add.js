// const { contactSchema } = require('../../models/contact');
const { Contact } = require('../../models');

const add = async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     message: error.message,
    //   });
    // }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
