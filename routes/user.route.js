const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router
  .get('/:userId', userController.getUser)
  .post('/', userController.createUser)
  .put('/:userId', userController.updateUser)
  .delete('/:userId', userController.removeUser)
  .get('/:userId/articles', userController.getUserArticles);

module.exports = router;
