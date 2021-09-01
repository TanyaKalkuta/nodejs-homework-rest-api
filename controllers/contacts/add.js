const { contactSchema } = require("../../validation");
const contactsOperations = require("../../model/contacts");

const add = async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
