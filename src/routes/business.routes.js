const express = require('express')
const businessController = require('../controllers/business.controller')
const validationMiddleware = require('../middlewares/validation.middeware')
const { businessStoreValidationSchema, businessLoginValidation, updateBusinessValidation } = require('../validations/business.validation')
const imageUpload = require('../utils/imageUploadHelper')

const router = express.Router();

router.get('/', businessController.fetchBusiness);
router.post('/businessImage', imageUpload.upload, businessController.uploadBusinessImage);
router.post('/signup', validationMiddleware(businessStoreValidationSchema), businessController.createBusiness);
router.post('/login', validationMiddleware(businessLoginValidation), businessController.login);
router.post('/signup/:id', validationMiddleware(updateBusinessValidation), businessController.updateBusiness);

module.exports = router