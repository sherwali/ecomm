const express = require('express')
const router = express.Router()



const { signup, signin, signout, requireSignin, isAdmin, isAuth } = require("../controllers/auth.js")
const {  userById } = require("../controllers/user.js")
const {  productById, read, create, remove, update, list, listRelated } = require("../controllers/product.js")



router.post('/product/create/:userId',requireSignin, isAdmin, isAuth, create)
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignin, isAdmin, isAuth, remove)
router.put('/product/:productId/:userId', requireSignin, isAdmin, isAuth, update)
router.get('/products', list)
router.get('/products/related/:productId', listRelated)
router.param('userId', userById)
router.param('productId', productById)



module.exports = router