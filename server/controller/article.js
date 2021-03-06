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
          desc : {
            $regex : searchKey
          }
        }
      ]
    }
    pageQuery(page, pageSize, Article, {
      path: 'classify',
      select: '_id, label'
    }, params)
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
    const {id} = req.body
    Article.deleteOne({
      _id: id
    }, function (err, doc) {
      if (err) {
        console.log(err)
        res.json(formatRes('serverError'))
      }
      res.json(formatRes('isOk', doc))
    });
  },
  
  create(req, res, next){
    const {title, classify, content, tabs, isShow} = req.body
  
    const data = content.split(/<!-- +more +-->/ig);
    
    let desc = ''
    if (data.length > 0) {
      desc = data[0]
    }
    Article.create({
      title, classify, desc, content, tabs, isShow
    }, function (err, doc) {
      if (err) {
        console.log(err)
        res.json(formatRes('serverError'))
      }
      
      res.json(formatRes('created', doc, '新建成功'))
    })
  },
  
  update(req, res, next){
    const {id, title, classify, content, tabs, isShow} = req.body
  
    const data = content.split(/<!-- +more +-->/ig);
  
    let desc = ''
    if (data.length > 0) {
      desc = data[0]
    }
    Article.findOneAndUpdate({
      _id: id
    }, {
      title, classify, desc, content, tabs, isShow
    }, (err, doc) => {
      
      if (err) {
        res.json(formatRes('serverError'))
      }
      
      res.json(formatRes('update'))
    })
  }
}

module.exports = articleController
