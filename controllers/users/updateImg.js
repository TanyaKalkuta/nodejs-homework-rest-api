const fs = require('fs').promises;
const path = require('path');
const transformAvatars = require('../../services/transformAvatars');

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public/avatars');

const updateImg = async (req, res) => {
  console.log(req.file);
  try {
    const { id } = req.params;
    const { path: tempPath, originalname } = req.file;

    const uploadPath = path.join(avatarsDir, id, originalname);

    await transformAvatars(tempPath);

    await fs.rename(tempPath, uploadPath);
    const avatarURL = `/avatars/${id}/${originalname}`;
    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: avatarURL,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-undef
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateImg;
