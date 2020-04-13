const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
// const koaStatic = require('koa-static')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const cors = require('koa2-cors')

const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

const index = require('./routes/index')
const users = require('./routes/users')
const utils = require('./routes/utils')

const { isDev } = require('./utils/env')

app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return '*' // 允许来自所有域名请求
    }
    return 'http://localhost:8080' // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'], // 允许跨域的方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text']
// }))

app.use(koaBody({
  formidable: {
    // 设置文件的默认保存目录，不设置则保存在系统临时目录下  
    uploadDir: path.resolve(__dirname, '../uploadFiles')
  },
  multipart: true // 支持文件上传
}))

// app.use(koaStatic(
//   path.resolve(__dirname, '../uploadFiles')
// ))


app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(path.join(__dirname, '..', 'uploadFiles')))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'dtzdq.sid', // cookie name 默认是koa.sod
  prefix: 'dtzdq:sess:', // redis key 的前缀，默认是 koa:sess
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
