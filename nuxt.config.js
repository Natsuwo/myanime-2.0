const colors = require('vuetify/es5/util/colors').default
const axios = require('axios')

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

const getSitemapBlogsFn = sitemapIndex => () =>
  axios.get(`http://localhost:3000/api/getSiteMapRoutes?index=${sitemapIndex}`)
    .then(response => response && response.data)
    .then(offers =>
      offers.code.map((code) => ({
        url: `https://myanime.co/watch?a=${code}`,
        changefreq: 'daily',
        priority: 1,
      })),
    )


const getSitemapsConfigurations = () =>
  range(31).map(index => ({
    path: `sitemap-${index}.xml`,
    routes: getSitemapBlogsFn(index),
    cacheTime: 1000 * 60 * 60 * 2,
    trailingSlash: false,
    exclude: ['/**'], //here we exclude all static routes
  }))

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s',
    title: process.env.siteTitle || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/custom.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3b8070", throttle: 0 },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/moment',
    '@/plugins/siema',
    { src: '@/plugins/ga.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/sitemap'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'cookie-universal-nuxt'
  ],
  sitemap: {
    path: '/sitemap.xml',
    gzip: true,
    sitemaps:
      [
        {
          path: 'sitemap-routes.xml',
          cacheTime: 1000 * 60 * 60 * 2,
          trailingSlash: false,
          exclude: ['/user/**', '/watch']
        },
        ...getSitemapsConfigurations(),
      ]
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    optimization: {
      splitChunks: {
        name: true,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
