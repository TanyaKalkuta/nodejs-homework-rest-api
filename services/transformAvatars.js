const Jimp = require('jimp');

const transformAvatars = async pathFile => {
  const file = await Jimp.read(pathFile);
  await file.resize(250, 250).write(pathFile);
};

module.exports = transformAvatars;
