const express = require("express");
const businessController = require("../controllers/business.controller");
const validationMiddleware = require("../middlewares/validation.middeware");
const {
  businessValidationSchema,
  businessLoginValidation,
} = require("../validations/business.validation");

const router = express.Router();

router.get("/", businessController.fetchBusiness);
router.post(
  "/signup",
  validationMiddleware(businessValidationSchema),
  businessController.createBusiness
);
router.post(
  "/login",
  validationMiddleware(businessLoginValidation),
  businessController.login
);

module.exports = router;
