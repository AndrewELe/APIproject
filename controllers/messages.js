const crypto = require('crypto-js')
const User = require('../models/user.js')
const Msg = require('../models/message.js')

// exports encode message
exports.encodeMessage = async (req, res) => {
    try{

        // setting specific message and user 
        const targetMessage = await Msg.findOne({ _id: req.params.id })

        const message = req.message
        const secretWord = req.user.secretWord

        //encrypting message
        const cipherText = crypto.AES.encrypt(message, secretWord)

        //update the message to be the encrypted message
        targetMessage.message = cipherText

        await targetMessage.save()
        res.json(targetMessage)
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
        
        //defining variables message and user for manipulation
        const message = targetMessage.message
        const secretWord = req.user.secretWord

        console.log(message)
        //decrypting message
        const bytes = crypto.AES.decrypt(message, secretWord)

        console.log(bytes)
        const plainText = bytes.toString(crypto.enc.Utf8)

        console.log(plainText)
        //update the message to be the encrypted message
        targetMessage.message = plainText

        await targetMessage.save()
        res.json(targetMessage)
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
        const message = await Msg.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true })
        res.json(message)
    }catch(error){
        res.status(400).json({ message: error.message })
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
