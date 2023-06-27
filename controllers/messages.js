const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const Msg = require('../models/message.js')

// exports encode message

exports.encodeMessage = async (req, res) => {
    try{
        const targetMessage = await Msg.findOne({ _id: req.params.id })
        const targetUser = await User.findOne({ _id: req.params.id })
        
        const encodedMessage = targetMessage.message
        const secretWord = targetUser.secretWord

        //check if targetMessage is being taken in as a string if not than coerce it to be a string
        //catch secretword in user model and set it to a variable
        //use jsonwebtoken to encode the message
        //update the message model with the encoded message
        //return the encoded message

    }catch(error){
        res.status(400).json({ message: error.message })
    }
}


// exports decode message

// exports create message
exports.createMessage = async function(req,res) {
    try{
        req.body.user = req.params.id
        const message = await Msg.create(req.body)
        await req.user.save()
        res.json(message)
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

// exports delete message
exports.deleteMessage = async function(req,res) {
    try{
        const targetMessage = await Msg.findOne({ _id: req.params.id})
        const result = await targetMessage.deleteOne()
        if (result.deleteCount === 1){
            res.json({ message: 'message deleted' })
        } else {
            res.json({ message: 'message not found' })
        }
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}
// exports update message
exports.updateMessage = async function(req,res) {
    try{
        const updates = Object.keys(req.body)
        const targetMessage = await Msg.findOne({ _id: req.params.id })
        updates.forEach(update => targetMessage[update] = req.body[update])
        await targetMessage.save()
    }catch(error){

    }
}

// exports get message
exports.displayMessage = async function(req,res) {
    try{
        const message = await Msg.findOne({ _id: req.params.id })
        res.json(message)
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}
