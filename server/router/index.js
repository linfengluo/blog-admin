/**
 * Created by linfengluo@gmail.com on 2018/12/10.
 */
const { Router } = require('express')
const auth = require('./auth')

const router = Router()

router.use(auth)

module.exports = router
