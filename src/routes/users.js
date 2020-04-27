/**
 * @description user API 路由
 * @author 抖腿震地球
 */

const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const userValidator = require('../validator/user')
const { register, isExist, login, changeInfo } = require('../controller/user')
const { genValidator } = require('../middlewares/validator')
const { loginCheck } = require('../middlewares/loginCheck')

router.prefix('/api/user')

// 检测用户是否存在
router.post('/isExist', async(ctx, next) => {
  const { account } = ctx.request.body
  ctx.body = await isExist(account)
})

// 用户注册路由
router.post('/register', genValidator(userValidator), async(ctx, next) => {
  const { account, password } = ctx.request.body
  ctx.body = await register({
    account,
    password
  })
})

// 用户登录
router.post('/login', async(ctx, next) => {
  const { account, password } = ctx.request.body
  ctx.body = await login(ctx, account, password)
})

// 用户修改信息路由
router.post('/changeInfo', loginCheck, koaFrom(), genValidator(userValidator), async(ctx, next) => {
  const { nickName, avatar, signature } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, avatar, signature })
})

module.exports = router
