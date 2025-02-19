const listContacts = require('./getAll');
const getContactById = require('./getById');
const addContact = require('./add');
const updateContact = require('./updateById');
const removeContact = require('./delById');
const updateStatusContact = require('./updateStatusContact');
const updateImgContact = require('./updateImgContact');

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
  updateImgContact,
};
