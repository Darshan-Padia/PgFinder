const db = require("../helpers/db.helper");

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

async function getAllUsers() {
  return await db.User.findAll();
}

async function getUserById(id) {
  return await db.User.findByPk(id);
}

async function createUser(userParams) {
  return await db.User.create(userParams);
}

async function updateUser(id, userParams) {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  Object.assign(user, userParams);
  await user.save();
  return user;
}

async function deleteUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  await user.destroy();
}
