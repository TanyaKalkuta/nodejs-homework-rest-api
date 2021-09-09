const { Contact } = require('../../models');
const { NotFound } = require('http-errors');
// const createError = require('http-errors');

const getById = async (req, res, next) => {
  // try {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound();
    // throw new createError.NotFound();
    // return res.status(404).json({
    //   message: 'Not found',
    // });
  }
  res.json({
    status: 'success',
    code: 200,
    contact,
  });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = getById;
