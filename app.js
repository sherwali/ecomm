const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
var bodyParser = require('body-parser')

// const cookiParser = require('cooki-parser')
const morgan = require('morgan')







// import routes
const userRoutes = require('./routes/user.js')





//app
const app = express()


app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

//db

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => console.log('database connected') )

//routes middleware


app.use(morgan('dev'))

app.use('/api' ,userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

