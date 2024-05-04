const db = require("../helpers/db.helper");

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage
};

async function getAllMessages() {
  return await db.Message.findAll();
}

async function getMessageById(id) {
  return await db.Message.findByPk(id);
}

async function createMessage(messageParams) {
  return await db.Message.create(messageParams);
}

async function updateMessage(id, messageParams) {
  const message = await db.Message.findByPk(id);
  if (!message) throw 'Message not found';
  Object.assign(message, messageParams);
  await message.save();
  return message;
}

async function deleteMessage(id) {
  const message = await db.Message.findByPk(id);
  if (!message) throw 'Message not found';
  await message.destroy();
}
