const express = require('express')
const router = express.Router()
const {userSignupValidator} = require('../validator')

const { signup, signin } = require("../controllers/user.js")

router.post('/signup',userSignupValidator, signup)
router.post('/signin', signin)

module.exports = router