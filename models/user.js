const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid');
var bodyParser = require('body-parser')





const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32

    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique:32
    },
    hashed_password: {
        type: String,
        trime: true,
        required: true,
        unique: 32
    },

    about: {
        type: String,
        trime:true,
    },
    salt:{
        type: String
    },

    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default:[]
    },
    
}, { timestamps: true })

//virtual fields

userSchema.virtual('password')
.set( (password) => {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
} )
.get(() => { return this._password })

userSchema.methods = {
    encryptPassword: (password) => {
        if(!password) return ''
        try {

            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch(err){
            return ''
        }
    } 
}

module.exports = mongoose.model("User", userSchema)