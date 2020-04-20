const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { genValidator } = require('../middlewares/validator')
const diaryValidate = require('../validator/diary')
const { createDiaryInfo } = require('../controller/diary')

router.prefix('/api/bill')

router.put('/createDiary', loginCheck, genValidator(diaryValidate), async(ctx, next) => {
  const { time, title, content } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await createDiaryInfo({ userId, time, title, content })
})

module.exports = router