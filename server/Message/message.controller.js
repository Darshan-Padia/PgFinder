const messageService = require('../Message/message.service');

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage
};

async function getAllMessages(req, res, next) {
  try {
    const messages = await messageService.getAllMessages();
    res.json(messages);
  } catch (error) {
    next(error);
  }
}

async function getMessageById(req, res, next) {
  try {
    const message = await messageService.getMessageById(req.params.id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

async function createMessage(req, res, next) {
  try {
    const message = await messageService.createMessage(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

async function updateMessage(req, res, next) {
  try {
    const message = await messageService.updateMessage(req.params.id, req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

async function deleteMessage(req, res, next) {
  try {
    await messageService.deleteMessage(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
}
