const express = require('express')
const router = express.Router()
const {userSignupValidator} = require('../validator')

const { signup } = require("../controllers/user.js")

router.post('/signup',userSignupValidator, signup)

module.exports = router