const User = require('../models/user.js')




exports.signup = (req, res) => {
    
    console.log(req.body)
const user = new User(req.body)

}