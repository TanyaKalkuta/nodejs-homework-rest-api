const updateContacts = require("./updateContacts");
const getAll = require("./getAll");

const update = async (id, updateInfo) => {
  try {
    const contacts = await getAll();
    const idx = contacts.findIndex((item) => item.id === +id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { ...contacts[idx], ...updateInfo };
    // {id: "767580d5-f509-4f45-98f9-28e74ec4af66", "name": "Ground almonds", "price": 3, "location": "Home baking", price: 2}
    await updateContacts(contacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

module.exports = update;
