const express = require('express') //express for building and adding necessaru middleware features
const morgan = require('morgan') //morgan for logging requests and handling tokens
const userRoutes = require('./routes/users') //points to users.js file for user routes
const messageRoutes = require('./routes/messages') //points to messages.js file for message routes
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

module.exports = app //sending app.js file values to requesting filepaths in API