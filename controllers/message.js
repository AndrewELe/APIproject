const jwt = require('jsonwebtoken')
const Msg = require('../models/message.js')

// exports encode message
exports.encode = async (req, res) => {
    try{
        //const keyWord = await 
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const msg = new Msg(req.body)
        msg.sender = data.id
        await msg.save()
        res.json(msg)
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

// exports decode message

// exports create message

// exports delete message

// exports update message

// exports get message

