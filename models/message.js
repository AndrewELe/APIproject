require('dotenv').config()
const { model, Schema } = require('mongoose')
const jwt = require('jsonwebtoken')


const messageSchema = new Schema({ 
    addressedTo: { type: String, required: true },
    recieved: { type: Boolean, required: false, default: false },
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
})


//secret word from users.js usersSchema model? can i point to the model for the word?

//capture specific message string from json object and use jsonwebtoken to encode the message string
messageSchema.methods.toJSON = function(){
    const encodedMessage = this.toObject()
    encodedMessage.message = jwt.sign({ message: encodedMessage.message }, process.env.SECRET)
    return encodedMessage
}

//decode message string from json object and return decoded message string
messageSchema.methods.decodeMessage = function(){
    const decodedMessage = this.toObject()
    decodedMessage.message = jwt.verify(decodedMessage.message, process.env.SECRET).message
    return decodedMessage
}

const Message = model('Message', messageSchema)

module.exports = Message