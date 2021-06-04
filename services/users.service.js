const mongoose = require('mongoose');
const { Types } = mongoose;
const { ObjectId } = Types;
const User = require('../models/user');
const { badRequest } = require('../config/errorHelper');
const articlesService = require('./articles.service');

async function findUser(options) {
  return User.findOne(options);
}

async function createUser(data) {
  const existingUser = await findUser({ firstName: data.firstName });
  if (existingUser) {
    throw badRequest('User already exists');
  }
  return User.create(data);
}

async function updateUser(userId, payload) {
  const user = await User.findById(userId);
  if (!user) {
    throw badRequest('User does not exist');
  }
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (['firstName', 'lastName', 'role', 'author', 'numberOfArticles'].includes(key)) {
      user[key] = value;
    }
  });
  await user.save();
  return user;
}

async function getUser(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw badRequest('User does not exists');
  }
  return user;
}

async function getUserArticles(userId) {
  const user = await User.findById(userId).populate('articles');
  if (!user) {
    throw badRequest('User does not exists');
  }
  return await articlesService.findArticles({ owner: ObjectId(user._id) });
}

async function removeUser(userId) {
  return await User.findByIdAndRemove(userId);
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  removeUser,
  getUserArticles
};
