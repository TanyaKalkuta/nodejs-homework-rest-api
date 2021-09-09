const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  // try {
  const contacts = await Contact.find({ owner: req.user._id }).populate(
    'owner',
    '_id email',
  );
  res.json({
    status: 'success',
    code: 200,
    contacts,
  });
  // } catch (error) {
  //   console.log(error.message);
  //   // next(error);
  // }
};

module.exports = getAll;
