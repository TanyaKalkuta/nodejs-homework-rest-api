const contactsOperations = require("../../model/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
