require('dotenv').config()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try{
        //const token = req.header('Authorization').replace('Bearer ', '')
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWEyY2Q3NzBhNjlkZDE3NTBmNzlhOSIsImlhdCI6MTY4NzgyNjY5Mn0.nZV0FCOEZA_0TKjgmm7ZWTlGWouLVn2l8OK3EvMPAvI"
        console.log(process.env.SECRET)
        console.log(token)
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data.id })
        if(!user){
            throw new Error('bad credentials')
        }
        req.user = user
        next()
    }catch(error){
        res.status(401).json({ message: error.message })
    }
}

exports.createUser = async (req, res) => {
    try{
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try{
        const user = await User.findOne({ email:req.body.email })
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            throw new Error('Invalid login credentials')
        } else {
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try{
        const updates = Object.keys(req.body)
        const targetUser = await User.findOne({ _id: req.params.id })
        updates.forEach(update => targetUser[update] = req.body[update])
        await targetUser.save()
        res.json({ message: 'user updated' })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const targetUser = await User.findOne({ _id: req.params.id })
        const result = await targetUser.deleteOne()
        if (result.deletedCount === 1){
            res.json({ message: 'user deleted' })
        } else {
            res.json({ message: 'user not found' })
        }
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}