const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, min: 4, max: 50, required: true },
    lastName: { type: String, min: 3, max: 60, required: true },
    role: { type: String, enum: ['admin', 'writer', 'guest'] },
    numberOfArticles: { type: Number, default: 0 },
    nickname: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('User', UserSchema);
