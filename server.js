require('dotenv').config()
const mongoose = require('mongoose')  //middleware that allows connection of data to MongoDB
const PORT = process.env.PORT || 3000 //setting port num to 3000
const app = require('./app') //pointing to app.js file for utilize required middleware for API requests

mongoose.connect(process.env.MONGO_URI) // .env file for password and username for MongoDB and URL
mongoose.connection.once('open', () => console.log('Connected to MongoDB')) //once connection is open, console log message

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) // indicating port number is open and functioning
})
