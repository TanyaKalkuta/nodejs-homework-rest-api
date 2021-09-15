const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  /* пагинация: */
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const total = await Contact.estimatedDocumentCount();
  const contacts = await Contact.find(
    { owner: req.user._id },
    '_id name email phone image',
    { skip, limit: +limit },
  ).populate('owner', '_id email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
      total,
      pages: Math.ceil(total / limit),
    },
  });
};

module.exports = getAll;
