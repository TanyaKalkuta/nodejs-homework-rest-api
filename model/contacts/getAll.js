// const fs = require("fs/promises");
const fs = require("fs").promises;

const filePath = require("./filePath");

const getAll = async () => {
  try {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

module.exports = getAll;
