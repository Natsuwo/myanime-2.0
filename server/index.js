require('dotenv').config()
const http = require('http')
const consola = require('consola')
const app = require('./app')(__dirname)
const server = http.createServer(app)

require('./socket')(server)
const { Nuxt, Builder } = require('nuxt')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

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
// Only Server
// const nuxt = new Nuxt(config)
// const { host, port } = nuxt.options.server
// app.listen(port, host)
// console.log(`Server is running on http://${host}:${port}`)