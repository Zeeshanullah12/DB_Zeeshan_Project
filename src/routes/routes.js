const express = require('express')
const businessRouter = require('./business.routes')

const router = express.Router()

// *** Module Main Routes *****
router.use('/business', businessRouter)

module.exports = router
