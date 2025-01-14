const express = require('express')
const authenticateToken = require('../middlewares/authurization.middleware')
const productsController = require('../controllers/products.controller')


const router = express.Router();

router.get('/vegitables', authenticateToken, productsController.fetchVegitables);
router.get('/fruits', authenticateToken, productsController.fetchFruits);


module.exports = router