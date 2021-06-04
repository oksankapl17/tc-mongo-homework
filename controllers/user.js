const userService = require('../services/users.service');

async function getUser(req, res, next) {
  try {
    const {
      params: { userId },
    } = req;
    const result = await userService.getUser(userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getUserArticles(req, res, next) {
  try {
    const {
      params: { userId },
    } = req;
    const result = await userService.getUserArticles(userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    return res.json({ data: user });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const {
      params: { userId },
      body,
    } = req;
    const result = await userService.updateUser(userId, body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function removeUser(req, res, next) {
  try {
    const {
      params: { userId },
    } = req;
    const result = await userService.removeUser(userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  removeUser,
  getUserArticles,
};
