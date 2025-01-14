const express = require('express')
const businessRouter = require('./business.routes')
const customerRouter = require('./customer.routes')
const productsRouter = require('./porducts.routes')

const router = express.Router()

// *** Module Main Routes *****
router.use('/business', businessRouter)
router.use('/customer', customerRouter)
router.use('/product', productsRouter)

module.exports = router
