const express = require('express');

const { joiSchema, joiSubscriptionSchema } = require('../../models/user');
const {
  validation,
  controllerWrapper,
  authenticate,
  upload,
} = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);
const subscripValidationMiddleware = validation(joiSubscriptionSchema);

router.post(
  '/signup',
  userValidationMiddleware,
  controllerWrapper(ctrl.register),
);

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login));

router.get(
  '/logout',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout),
);

router.get(
  '/current',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.current),
);
router.patch(
  '/',
  subscripValidationMiddleware,
  controllerWrapper(authenticate),
  ctrl.updateSubscription,
);
router.patch(
  '/avatars/:id',
  upload.single('avatarURL'),
  controllerWrapper(authenticate),
  ctrl.updateImg,
);

module.exports = router;
