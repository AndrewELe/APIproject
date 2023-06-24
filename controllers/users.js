require('dotenv').config()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data.id })
        if(!user){
            throw new Error('bad credentials')
        }
        req.user = user
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
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.json(req.user)
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try{
        await req.user.deleteOne()
        res.sendStatus(204)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}