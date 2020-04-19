/**
 * @description bill API 路由
 * @author 抖腿震地球
 */

const router = require('koa-router')()
const { isExist, createBill, searchBill, getBills } = require('../controller/bill')
const { loginCheck } = require('../middlewares/loginCheck')
const billValidate = require('../validator/bill')
const { genValidator } = require('../middlewares/validator')

router.prefix('/api/bill')

// 检查账单是否已存在
router.get('/isExist', loginCheck, async(ctx, next) => {
  const { time } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await isExist(userId, time)
})

// 创建账单
router.put('/createBill', loginCheck, genValidator(billValidate), async(ctx, next) => {
  const { time, eat, shopping, trip, live, other } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await createBill({ userId, time, eat, shopping, trip, live, other })

})

router.get('/searchBill', loginCheck, async(ctx, next) => {
  const { time } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await searchBill(userId, time)
})

router.get('/getBillList', loginCheck, async(ctx, next) => {
  const { pageIndex, pageSize } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await getBills({ userId, pageIndex, pageSize })
})

router.post('/updateBill', loginCheck, genValidator(billValidate), async(ctx, next) => {
  const { time, eat, trip, shopping, live, other } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await undateBillData({ userId, time, eat, trip, shopping, live, other })
})

module.exports = router
