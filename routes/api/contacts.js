const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

// const productsOperations = require("../../model/contacts");

// GET /api/contacts
router.get("/", ctrl.listContacts);

// GET /api/contacts/48bd1cd8-72ca-42cc-8457-156bb8c30873
router.get("/:contactId", ctrl.getContactById);

// POST /api/contacts
router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

// PUT /api/contacts
router.put("/:contactId", ctrl.updateContact);

module.exports = router;

//было в репозитории по умолчанию
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
