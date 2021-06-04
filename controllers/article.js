const articleService = require('../services/articles.service');

async function getArticle(req, res, next) {
  try {
    const {
      params: { articleId },
    } = req;
    const result = await articleService.getArticle(articleId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function createArticle(req, res, next) {
  try {
    const article = await articleService.createArticle(req.body);
    return res.json({ data: article });
  } catch (error) {
    next(error);
  }
}

async function updateArticle(req, res, next) {
  try {
    const {
      params: { articleId },
      body,
    } = req;
    const result = await articleService.updateArticle(articleId, body);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function removeArticle(req, res, next) {
  try {
    const {
      params: { articleId },
    } = req;
    const result = await articleService.removeArticle(articleId);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function findArticles(req, res, next) {
  try {
    const { query } = req;
    const result = await articleService.findArticles(query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createArticle,
  updateArticle,
  getArticle,
  removeArticle,
  findArticles,
};
