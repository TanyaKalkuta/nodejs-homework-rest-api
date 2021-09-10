const { Contact } = require('../../models');
const { NotFound } = require('http-errors');
// const createError = require('http-errors');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound();
  }
  res.json({
    status: 'success',
    code: 200,
    contact,
  });
};

module.exports = getById;
