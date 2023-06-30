const crypto = require('crypto-js')
const User = require('../models/user.js')
const Msg = require('../models/message.js')

// exports encode message
exports.encodeMessage = async (req, res) => {
    try{
        // setting specific message and user 
        const targetMessage = await Msg.findOne({ _id: req.params.id })
        const targetUser = await User.findOne({ _id: req.user._id })
        
        //defining variables message and user for manipulation
        const message = targetMessage.message
        const key = targetUser.secretWord

        //encrypting message
        const cipherText = crypto.AES.encrypt(message, key)

        //update the message to be the encrypted message
        targetMessage.message = cipherText

        await targetMessage.save()
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}


// exports decode message

exports.decodeMessage = async (req, res) => {
    //decoding message takes an input from user and a encoded message from user and utilizes crpyto to decode message
    try{
        // setting specific message and user 
        const targetMessage = await Msg.findOne({ _id: req.params.id })
        const targetUser = await User.findOne({ _id: req.user._id })
        
        //defining variables message and user for manipulation
        const message = targetMessage.message
        const key = targetUser.secretWord

        //decrypting message
        const bytes = crypto.AES.decrypt(message, key)
        const plainText = bytes.toString(CryptoJS.enc.utf8)

        //update the message to be the encrypted message
        targetMessage.message = plainText

        await targetMessage.save()
    }catch(error){
        res.status(400).json({ message: error.message })
    }    
}

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
