const express = require('express')
const router = express.Router()


const {  userById } = require("../controllers/user.js")
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth.js")


router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)

module.exports = router