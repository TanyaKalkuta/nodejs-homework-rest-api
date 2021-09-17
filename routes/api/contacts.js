const express = require('express');

const { joiSchema } = require('../../models/contact');
const {
  validation,
  controllerWrapper,
  authenticate,
  upload,
} = require('../../middlewares');

const ctrl = require('../../controllers/contacts');

const contactValidationMiddleware = validation(joiSchema);

const router = express.Router();

/* GET /api/contacts */
router.get(
  '/',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.listContacts),
);

/* GET /api/contacts/48bd1cd8-72ca-42cc-8457-156bb8c30873 */
router.get(
  '/:contactId',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getContactById),
);

/* POST /api/contacts */
router.post(
  '/',
  controllerWrapper(authenticate),
  contactValidationMiddleware,
  controllerWrapper(ctrl.addContact),
);

router.delete(
  '/:contactId',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.removeContact),
);

/* PUT /api/contacts */
router.put(
  '/:contactId',
  controllerWrapper(authenticate),
  contactValidationMiddleware,
  ctrl.updateContact,
);

/* PATCH /api/contacts/status */
router.patch(
  '/:contactId/favorite',
  controllerWrapper(authenticate),
  ctrl.updateStatusContact,
);
router.patch(
  '/:id',
  upload.single('image'),
  controllerWrapper(ctrl.updateImgContact),
);
module.exports = router;
