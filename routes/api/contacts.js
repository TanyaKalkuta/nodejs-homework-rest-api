const express = require('express');

const { joiSchema } = require('../../models/contact');
const { validation } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');

const validationMiddleware = validation(joiSchema);

const router = express.Router();

// GET /api/contacts
router.get('/', ctrl.listContacts);

// GET /api/contacts/48bd1cd8-72ca-42cc-8457-156bb8c30873
router.get('/:contactId', ctrl.getContactById);

// POST /api/contacts
router.post('/', validationMiddleware, ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

// PUT /api/contacts
router.put('/:contactId', validationMiddleware, ctrl.updateContact);

// PATCH /api/contacts/status
router.patch('/:contactId/favorite', ctrl.updateStatusContact);
module.exports = router;

// было в репозитории по умолчанию
// const express = require('express')
// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router
