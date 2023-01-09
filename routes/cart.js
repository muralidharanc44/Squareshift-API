const express = require("express");
const router = express.Router()
const Cart = require('../controllers/cartModule/cart')

router.get('/items', Cart.cartList)
router.post('/items', Cart.addCart)
router.delete('/items/:_id', Cart.deletecart)
router.get('/checkout-value/:shipping_postal_code', Cart.checkoutValue)

module.exports = router
