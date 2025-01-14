const express = require('express')
const authenticateToken = require('../middlewares/authurization.middleware')
const customerController = require('../controllers/customer.controller')
const validationMiddleware = require('../middlewares/validation.middeware')
const { customerValidationSchema } = require('../validations/customer.validation')


const router = express.Router();

router.get('/', authenticateToken, customerController.fetchCustomers);
router.post('/add-customer', authenticateToken, validationMiddleware(customerValidationSchema), customerController.addCustomer);


module.exports = router