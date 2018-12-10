/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name : String,
  email: String,
  password: String,
  createdAt: Number,
  updatedAt: Number
});

AdminSchema.statics.findByEmail = function (email, cb) {
  return this.findOne({
    email: email
  })
}

module.exports = mongoose.model('admin', AdminSchema)
