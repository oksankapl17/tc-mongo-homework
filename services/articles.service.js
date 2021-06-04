const mongoose = require('mongoose');
const { Types } = mongoose;
const { ObjectId } = Types;
const Article = require('../models/article');
const User = require('../models/user');
const { badRequest } = require('../config/errorHelper');

async function findArticles(options) {
  return Article.find(options).populate('owner');
}

async function createArticle(data) {
  const { owner, ...article } = data;
  const existingUser = await User.findById(ObjectId(owner));
  if (!existingUser) {
    throw badRequest('User not exists');
  }
  const existingArticle = await Article.findOne({ title: data.title }).populate('owner');
  if (existingArticle) {
    throw badRequest('Article already exists');
  }
  const { numberOfArticles } = existingUser;
  existingUser.numberOfArticles = +numberOfArticles + 1;
  await existingUser.save();
  return Article.create({ ...article, owner: existingUser._id });
}

async function getArticle(articleId) {
  const article = await Article.findById(articleId).populate('owner');
  if (!article) {
    throw badRequest('Article does not exists');
  }
  return article;
}

async function updateArticle(articleId, payload) {
  const { owner, ...dataToUpdate } = payload;
  const article = await Article.findById(articleId);
  if (!article) {
    throw badRequest('Article does not exist');
  }
  if (owner) {
    const existingUser = await User.findById(ObjectId(owner));
    if (!existingUser) {
      throw badRequest('User not exists');
    }
    article.owner = ObjectId(owner);
  }
  Object.entries(dataToUpdate || {}).forEach(([key, value]) => {
    if (['title', 'subtitle', 'description', 'category'].includes(key)) {
      if (key === 'category') {
        if (['sport', 'games', 'history'].includes(value)) {
          article[key] = value;
        } else {
          throw badRequest('Please provide correct category name');
        }
      } else {
        article[key] = value;
      }
    }
  });
  await article.save();
  return article;
}

async function removeArticle(articleId) {
  const article = await Article.findById(ObjectId(articleId));
  if (!article) {
    throw badRequest('Article does not exists');
  }
  const existingUser = await User.findById(ObjectId(article.owner));
  const { numberOfArticles } = existingUser;
  existingUser.numberOfArticles = +numberOfArticles - 1;
  await existingUser.save();
  return Article.findByIdAndRemove(articleId);
}

module.exports = {
  createArticle,
  updateArticle,
  getArticle,
  removeArticle,
  findArticles,
};
