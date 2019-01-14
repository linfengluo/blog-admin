/**
 * Created by linfengluo@gmail.com on 2018/12/12.
 */

const formatRes = require('../units/formatRes')
const About = require('../model/about')
const {pageQuery} = require('../units/pageQuery')
const AboutController = {
  get(req, res, next){
    About.findOne()
      .select('content _id')
      .exec(function (err, doc) {
        if (err) {
          res.json(formatRes('serverError'))
        }
        res.json(formatRes('isOk', doc ? doc : ''))
      });
  },
  
  create(req, res, next){
    const {content} = req.body
  
    About.create({
     content
    }, function (err, doc) {
      if (err) {
        res.json(formatRes('serverError'))
      }
      
      res.json(formatRes('created', doc, '新建成功'))
    })
  },
  
  update(req, res, next){
    const {content, id} = req.body
    
    About.findOneAndUpdate({
      _id: id
    }, {
      content
    }, (err, doc) => {
      if (err) {
        res.json(formatRes('serverError'))
      }
      
      res.json(formatRes('update'))
    })
  }
}

module.exports = AboutController
