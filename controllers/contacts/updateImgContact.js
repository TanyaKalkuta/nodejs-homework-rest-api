const fs = require('fs').promises;
const path = require('path');

const { Contact } = require('../../models');

const contactsDir = path.join(__dirname, '../../', 'public/contacts');

const updateImgContact = async (req, res) => {
  console.log(req.file);
  try {
    const { id } = req.params;
    const { path: tempPath, originalname } = req.file;

    const uploadPath = path.join(contactsDir, id, originalname);
    await fs.rename(tempPath, uploadPath);
    const image = `/contacts/${id}/${originalname}`;
    await Contact.findByIdAndUpdate(id, { image });
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: image,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateImgContact;
