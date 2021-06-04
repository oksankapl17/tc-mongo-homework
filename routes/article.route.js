const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router
  .get('/', articleController.findArticles)
  .get('/:articleId', articleController.getArticle)
  .post('/', articleController.createArticle)
  .put('/:articleId', articleController.updateArticle)
  .delete('/:articleId', articleController.removeArticle);

module.exports = router;
