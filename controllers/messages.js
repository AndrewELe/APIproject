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
        const cipherText = crypto.AES.encrypt(message, secretWord).toString()
        console.log(cipherText)
        //update the message to be the encrypted message
        targetMessage.message = cipherText

        await targetMessage.save()
        res.json(targetMessage)
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}


// exports decode message, this function is deprecated for now, will be updated in the future

exports.decodeMessage = async (req, res) => {
    //decoding message takes an input from user and a encoded message from user and utilizes crpyto to decode message
    try{
        // setting specific message and user 
        const targetMessage = await Msg.findOne({ _id: req.params.id })
        
        //defining variables message and user for manipulation
        const jsonMessage = targetMessage.message
        const secretWord = req.user.secretWord
        console.log(typeof jsonMessage)
        // const message = JSON.stringify(jsonMessage)

        // console.log(message) //captures the message that is encrypted
        // console.log(secretWord) //unit test this, ensure that the key is actually being captured
        
        //decrypting message
        const bytes = crypto.AES.decrypt(jsonMessage, secretWord)

        console.log(bytes) //outputs capture variables of string information?
        const plainText = bytes.toString(crypto.enc.Utf8)
    

        console.log('1')
        console.log(plainText) //does not output decrypted string, it is a string but the output appears to be null and mongoose will not save the null value
        
        console.log('2')
        targetMessage.message = plainText

        await targetMessage.save()
        console.log('3')
        res.json(targetMessage) 

        /*

        revert crypto to version 3.1.9-1?
        https://github.com/imchintan/react-native-crypto-js/issues/6

        */

    }catch(error){
        res.status(400).json({ message: error.message })
        console.log(error)
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
