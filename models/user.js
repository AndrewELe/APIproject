require('dotenv').config() //require access for dotenv
const mongoose = require('mongoose') //require middle for mongoDB 
const bcrypt = require('bcrypt') //require bcrypt for password hashing
const jwt = require('jsonwebtoken') //require jsonwebtoken for token creation

const userSchema = new mongoose.Schema({ //creating userSchema for user data 
    name: { type: String, required: true }, //name field for userSchema
    email: { type: String, required: true, unique: true }, //email field for userSchema
    password: { type: String, required: true }, //password field for userSchema
    //message: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], //message field for userSchema, points to message.js file for model reference
}, { 
    timestamps: true  //timestamps for userSchema
})

userSchema.pre('save', async function(next){
    this.isModified('password') ? //if password is modified, hash password, else password is null
    this.password = await bcrypt.hash(this.password, 10) :
    null;
    next()
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ id: this._id }, process.env.SECRET) //creating token with user id and SECRET word from .env file
    return token
}

const User = mongoose.model('User', userSchema) //creating User model for userSchema

module.exports = User //exporting User model for use in other files