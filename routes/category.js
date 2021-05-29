const express = require('express')
const router = express.Router()



const { create } = require("../controllers/category.js")
const { signup, signin, signout, requireSignin, isAdmin, isAuth } = require("../controllers/auth.js")
const {  userById } = require("../controllers/user.js")



router.post('/category/create/:userId',requireSignin, isAdmin, isAuth, create)

router.param('userId', userById)



module.exports = router