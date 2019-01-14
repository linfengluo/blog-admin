/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */
const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  content: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('About', AboutSchema)
