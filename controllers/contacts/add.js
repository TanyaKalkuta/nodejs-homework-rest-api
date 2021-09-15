const fs = require('fs').promises;
const path = require('path');

const { Contact } = require('../../models');

const contactsDir = path.join(__dirname, '../../', 'public/contacts');

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);
  const id = result._id.toString();
  const dirPath = path.join(contactsDir, id);
  await fs.mkdir(dirPath);

  res.status(201).json({
    status: 'success',
    code: 201,
    result,
  });
};

module.exports = add;
