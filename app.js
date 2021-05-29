const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
var bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator')


const cookiParser = require('cookie-parser')
// const morgan = require('morgan')







// import routes
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user.js')
const categoryRoutes = require('./routes/category.js')





//app
const app = express()

app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use(cookiParser())
app.use(expressValidator())

//db

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => console.log('database connected') )

//routes middleware


app.use(morgan('dev'))

app.use('/api' ,authRoutes)
app.use('/api' ,userRoutes)
app.use('/api' ,categoryRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

