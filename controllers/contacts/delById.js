const { Contact } = require('../../models');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({
      status: 'success',
      code: 200,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;

/* const { Contact } = require('../../models');

const delById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndDelete(contactId);
    if (!deleteContact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
      deleteContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = delById; */
