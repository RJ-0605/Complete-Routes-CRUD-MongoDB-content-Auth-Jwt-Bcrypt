

const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const bodyParser = require('body-parser')
// Mongodb Connection
require('./config/database');

const loginRouter = require('./controllers/login')
const SignupRouter = require('./controllers/signup')
const HomeRouter = require('./controllers/home')
const UserRouter = require('./controllers/UserRouter')

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded for picking data or params
// in post request of forms 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



app.use('/signup', SignupRouter)


app.use('/login', loginRouter)

app.use('/user',UserRouter)

app.use('/', HomeRouter)





app.listen(port, () => console.log(`Started App on port : ${port}`))





