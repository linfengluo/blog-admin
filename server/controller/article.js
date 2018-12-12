/**
 * Created by linfengluo@gmail.com on 2018/12/12.
 */

const formatRes = require('../units/formatRes')
const Article = require('../model/article')
const {pageQuery} = require('../units/pageQuery')
const articleController = {
  getList(req, res, next){
    const {page, pageSize, classify, searchKey} = req.query
    let params = {}
    if (classify) {
      params.classify = classify
    }
    if (searchKey) {
      params.$or = [
        {
          title: {
            $regex: searchKey
          }
        },
        {
          content : {
            $regex: searchKey
          }
        },
        {
          esc : {
            $regex : searchKey
          }
        }
      ]
    }
    pageQuery(page, pageSize, Article, '', params)
      .then(result => {
        res.json(formatRes('isOk',result))
      })
      .catch(err => {
        res.json(formatRes('serverError', err))
      })
  },
  
  get(req, res, next){
    const {id} = req.params
    Article.findById(id, function (err, doc) {
      if (err) {
        res.json(formatRes('serverError'))
      }
      res.json(formatRes('isOk', doc))
    });
  },
  
  delete(req, res, next){
    const {id} = req.params
    Article.findByIdAndRemove(id, function (err, doc) {
      if (err) {
        res.json(formatRes('serverError'))
      }
      res.json(formatRes('isOk', doc))
    });
  },
  
  save(req, res, next){
    const {id, title, classify, desc, content, tabs} = req.body
    if (id) {
      Article.findByIdAndUpdate(id, {
        title, classify, desc, content, tabs
      }, (err, doc) => {
        if (err) {
          res.json(formatRes('serverError'))
        }
        
        res.json(formatRes('isOk', ''))
      })
    } else {
      Article.create({
        title, classify, desc, content, tabs
      }, function (err, doc) {
        if (err) {
          res.json(formatRes('serverError'))
        }
        
        res.json(formatRes('created', ''))
      })
    }
  }
}

module.exports = articleController
