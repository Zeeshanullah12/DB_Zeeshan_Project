const express = require('express')
const userRouter = require('./user.routes')

const router = express.Router()

// *** Module Main Routes *****
router.use('/user', userRouter)

module.exports = router
