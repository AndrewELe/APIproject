const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messages')
const userController = require('../controllers/users')

//deleting message
router.delete('/:id', userController.auth, messageController.deleteMessage)

//updating message
router.put('/:id', userController.auth, messageController.updateMessage)

//creating message
router.post('/:id', userController.auth, messageController.createMessage)

//displaying message
router.get('/:id', userController.auth, messageController.displayMessage)

//encoding message
router.put('/encode/:id', userController.auth, messageController.encodeMessage)

//decoding message
router.put('decode/:id', userController.auth, messageController.decodeMessage)

module.exports = router