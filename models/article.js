const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ArticleSchema = new Schema(
  {
    title: { type: String, min: 5, max: 400, required: true, index: true },
    subtitle: { type: String, min: 5 },
    description: { type: String, min: 5, max: 5000, required: true },
    owner: { type: ObjectId, ref: 'User', required: true },
    category: {
      type: String,
      enum: ['sport', 'games', 'history'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Article', ArticleSchema);
