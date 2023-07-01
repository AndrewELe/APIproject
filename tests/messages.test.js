const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Server is running on port 8080'))

//importing crypto-js for testing encoding and decoding
const crypto = require('crypto-js')

const User = require('../models/user')
const Message = require('../models/message')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('testing the messages endpoints', () => {
            
    test('testing encoding messages', async () => {
        // test this by encoding the message and decoding the return here and checking if its actually the string
        const user = new User({
            name: 'test1',
            email: 'test1@gunky.com',
            password: 'test1234',
            secretWord: 'test'
        })
        await user.save()

        console.log(user.name)
        const responseUser = await request(app) // this holds the token
        
        .post('/users/login')
        .send({ 
            email: 'test1@gunky.com',
            password: 'test1234'
        })

        const message = new Message({
                addressedTo: 'test',
                recieved: false,
                message: 'testing message',
                user: responseUser.body.user._id
            })
        await message.save()

        console.log(message)

        const response = await request(app)
            .put(`/messages/encode/${message._id}`)

        //code for decoding
        const targetMessage = await message.findOne({ _id: req.params.id })
        const targetUser = await user.findOne({ _id: req.user._id })
            
        //defining variables message and user for manipulation
        const messageTest = targetMessage.message
        const key = targetUser.secretWord
    
        //decrypting message
        const bytes = crypto.AES.decrypt(messageTest, key)
        const plainText = bytes.toString(CryptoJS.enc.utf8)

        expect(response.body.message).toBe(plainText)
        
    })

    test('testing decoding messages', async () => {
    
    })
    
    test('update message', async () => {

    })
    
    test('delete message', async () => {

    })

    test('create message', async () => {
        const message = await request(app)
        .post('/messages')
        .send({
            addressedTo: 'test',
            recieved: false,
            message: 'testing message'
        })
    await message.save()
    })

    test('display message', async () => {
    
    })
})