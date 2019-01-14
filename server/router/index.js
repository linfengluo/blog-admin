/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */
const { Router } = require('express')
const auth = require('./auth')
const classify = require('./classify')
const article = require('./article')
const about = require('./about')

const router = Router()

router.use(auth)
router.use(classify)
router.use(article)
router.use(about)
module.exports = router
