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

const Message = model('Message', messageSchema)

module.exports = Message