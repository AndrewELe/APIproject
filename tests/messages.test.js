const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8081, () => console.log('Server is running on port 8081'))

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
        const token = await user.generateAuthToken()

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
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        
    })

    test('testing decoding messages', async () => {
    
    })
    
    test('update message', async () => {

    })
    
    test('delete message', async () => {
        
    })

    test('create message', async () => {
        const user = new User({
            name: 'test2',
            email: 'test2@gunky.com',
            password: 'test1234',
            secretWord: 'test'
        })
        await user.save()
        const token = await user.generateAuthToken()

        const responseUser = await request(app) // this holds the token
            .post('/users/login')
            .send({ 
                email: 'test2@gunky.com',
                password: 'test1234'
        })

        const message = new Message({
                addressedTo: 'test2',
                recieved: false,
                message: 'testing message2',
                user: responseUser.body.user._id
            })
        await message.save()

        const response = await request(app)
            .post(`/messages/${message._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                addressedTo: 'test2',
                recieved: false,
                message: 'testing message2',
                user: responseUser.body.user._id
            })

        
        expect(response.body.message).toBe('testing message2')
    })

    test('display message', async () => {
        const user = new User({
            name: 'test3',
            email: 'test3@gunky.com',
            password: 'test1234',
            secretWord: 'test'
        })
        await user.save()
        const token = await user.generateAuthToken()

        const responseUser = await request(app) // this holds the token
            .post('/users/login')
            .send({ 
                email: 'test3@gunky.com',
                password: 'test1234'
        })

        const message = new Message({
            addressedTo: 'test',
            recieved: false,
            message: 'testing message3',
            user: responseUser.body.user._id
        })
        await message.save()

        const response = await request(app)
            .get(`/messages/${message._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.body.message).toBe('testing message3')
    })
})