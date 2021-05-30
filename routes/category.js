const express = require('express')
const router = express.Router()



const { create, read , categoryById, update, remove, list} = require("../controllers/category.js")
const { signup, signin, signout, requireSignin, isAdmin, isAuth } = require("../controllers/auth.js")
const {  userById } = require("../controllers/user.js")


router.get('/category/:categoryId', read)

router.post('/category/create/:userId',requireSignin, isAdmin, isAuth, create)
router.put('/category/:categoryId/:userId',requireSignin, isAdmin, isAuth, update)
router.delete('/category/:categoryId/:userId',requireSignin, isAdmin, isAuth, remove)
router.get('/categories', list)

router.param('categoryId', categoryById)
router.param('userId', userById)



module.exports = router