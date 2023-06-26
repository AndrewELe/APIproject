const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Server is running on port 8080'))

const User = require('../models/user')
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

    describe('testing the user endpoints', () => {

        test('this test should be creating a new user', async () => {
            const response = await request(app)
                .post('/users')
                .send({
                    name: 'test',
                    email: 'test@funky.com',
                    password: 'test123'
                })

            expect(response.body.user.name).toBe('test')
            expect(response.body).toHaveProperty('token')
        })

        test('this test should login a user', async () => {            const user = new User({
                name: 'test1',
                email: 'test1@gunky.com',
                password: 'test1234'
            })
            await user.save()

            const response = await request(app)
                .post('/users/login')
                .send({ 
                    email: 'test1@gunky.com',
                    password: 'test1234'
                })
        
            expect(response.statusCode).toBe(200)
            expect(response.body.user.name).toEqual('test1')
            expect(response.body.user.email).toEqual('test1@gunky.com')
            expect(response.body).toHaveProperty('token')
        })

        test('this test should update a user', async () => {
            const user = new User({
                name: 'test2',
                email: 'test2@gunk.com',
                password: 'test12345'
            })
            await user.save()
            const token = await user.generateAuthToken()

            const response = await request(app)
                .put(`/users/${user._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ 
                    name: 'test2 modified', 
                    email: 'test2Modified@gunk.com'
                })
        
            console.log(user._id)

            expect(response.statusCode).toBe(200)
        })

        test('this test should delete a user', async () => {
            const user = new User({
                name: 'test3',
                email: 'test3@gunk.com',
                password: 'test123456'
            })
            await user.save()
            const token = await user.generateAuthToken()

            const response = await request(app)
                .delete(`/users/${user._id}`)
                .set('Authorization', `Bearer ${token}`)

        
            expect(response.statusCode).toBe(200)
        })
    })