const express = require("express");
const userController = require("../controllers/user.controller");
const validationMiddleware = require("../middlewares/validation.middeware");
const {
  userStoreValidationSchema,
  userLoginValidation,
  updateuserValidation,
  updateUserValidation,
} = require("../validations/user.validation");
const imageUpload = require("../utils/imageUploadHelper");

const router = express.Router();

router.get("/", userController.fetchUser);

router.post(
  "/userImage",
  imageUpload.upload,
  userController.uploadUserImage
);

router.post(
  "/signup",
  validationMiddleware(userStoreValidationSchema),
  userController.createUser
);

router.post(
  "/login",
  validationMiddleware(userLoginValidation),
  userController.login
);

router.post(
  "/signup/:id",
  validationMiddleware(updateUserValidation),
  userController.updateUser
);

module.exports = router;
