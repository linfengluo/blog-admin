/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title : String,
  classify: ObjectId,
  desc: String,
  content: String,
  tabs: String,
  comments: [
    {
      body: String,
      email: String,
      name: String,
      date: Date
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ArticleSchema.statics.findByTitle = function (title, cb) {
  return this.findOne({
    title: title
  })
}

ArticleSchema.statics.findById = function (id, cb) {
  return this.findById(id)
}

module.exports = mongoose.model('admin', ArticleSchema)
