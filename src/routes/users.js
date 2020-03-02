/**
 * @description user API 路由
 * @author 抖腿震地球
 */

const router = require('koa-router')()
const userValidator = require('../validator/user')
const { register, isExist, login } = require('../controller/user')
const { genValidator } = require('../middlewares/validator')

router.prefix('/api/user')

// 注册路由
router.post('/isExist', async(ctx, next) => {
  const { account } = ctx.request.body
  ctx.body = await isExist(account)
})

router.post('/register', genValidator(userValidator), async(ctx, next) => {
  const { account, password } = ctx.request.body
  ctx.body = await register({
    account,
    password
  })
})

router.post('/login', async(ctx, next) => {
  const { account, password } = ctx.request.body
  console.log(account)
  ctx.body = await login(ctx, account, password)
})

module.exports = router
