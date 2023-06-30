const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Server is running on port 8080'))

//importing crypto-js for testing encoding and decoding
const crypto = require('crypto-js')

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
        const message = await request(app)
            .post('/messages')
            .send({
                //fill this with message parameters
            })

        const response = await request(app)
            .put(`/messages/encode/${message._id}`)

        //code for decoding
        const targetMessage = await Msg.findOne({ _id: req.params.id })
        const targetUser = await User.findOne({ _id: req.user._id })
            
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
    
    })

    test('display message', async () => {
    
    })
})