
const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const jwtConfig = require('./config/jwt')
const mongodbLink = require('./config/mongodb')
const { Nuxt, Builder } = require('nuxt')
const api = require('./router/index')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
  secret: 'feng',
  resave: false,
  saveUninitialized: false
}))
app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  
  const DB = mongoose.connection;
  mongoose.connect(mongodbLink);
  
  DB.on('error', console.error.bind(console, 'connection error:'));
  DB.once('open', function() {
    // we're connected!
    console.log('mongoose success')
  });
  
  
  const nuxt = new Nuxt(config)

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  
  app.use('/api', expressJWT({
    secret: jwtConfig.secretOrKey,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.cookies.token || req.body.token || req.query.token) {
        return req.cookies.token || req.body.token || req.query.token;
      }
      return null;
    }
  }).unless({
    path: ['/api/login']
  }));
  
  app.use(function (err, req, res, next) {
    const originalUrl = req.originalUrl
    if (err) {
      return res.redirect(`/login?from=${encodeURIComponent(originalUrl)}`);
    } else {
      next();
    }
  });

  app.use(api)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
