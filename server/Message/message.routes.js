const express = require('express');
const router = express.Router();
const messageController = require('../Message/message.controller');

// Define routes
router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.post('/', messageController.createMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
