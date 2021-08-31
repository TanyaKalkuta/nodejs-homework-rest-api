const updateContacts = require("./updateContacts");
const getAll = require("./getAll");

const del = async (id) => {
  try {
    const contacts = await getAll();
    const idx = contacts.findIndex((item) => item.id == id);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter((item) => item.id !== id);
    // const delContact = contacts.splice(idx, 1);
    await updateContacts(newContacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

module.exports = del;
