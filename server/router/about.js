/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */

const { Router } = require('express')
const About  = require('../controller/about')

const router = Router()

router.get('/api/about', function (req, res, next) {
  About.get(req, res, next)
})

router.post('/api/about', function (req, res, next) {
  About.create(req, res, next)
})
router.put('/api/about', function (req, res, next) {
  About.update(req, res, next)
})


module.exports = router
