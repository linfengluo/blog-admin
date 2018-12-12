/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
  title : String,
  classify: Schema.Types.ObjectId,
  desc: String,
  content: String,
  tabs: Array,
}, {
  timestamps: true
});


module.exports = mongoose.model('Article', ArticleSchema)
