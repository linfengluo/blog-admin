const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#FF5722',
    height: '4px'
  },

  /*
  ** Global CSS
  */
  css: [
    '~/scss/main.scss',
    '~/scss/sspai.scss',
    '~/node_modules/highlight.js/styles/monokai.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/ant-design',
    '@/plugins/axios',
    '@/plugins/global',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    credentials: true,
    baseURL: process.env.NODE_ENV === 'production' ? 'https://admin.luolinfeng.com/' : 'http://localhost:3301/'
  },

  /*
  ** Build configuration
  */
  build: {
    babel:{        //配置按需引入规则
      "plugins":[
        "transform-vue-jsx",
        "@babel/transform-runtime",
        ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
