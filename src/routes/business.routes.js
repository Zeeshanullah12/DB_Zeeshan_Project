const express = require('express')
const businessController = require('../controllers/business.controller')
const validationMiddleware = require('../middlewares/validation.middeware')
const businessStoreValidationSchema = require('../validations/business.validation')

const router = express.Router();

router.get('/', businessController.fetchBusiness);
router.post('/signup', validationMiddleware(businessStoreValidationSchema),  businessController.createBusiness);

module.exports = router