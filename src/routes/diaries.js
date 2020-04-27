const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { genValidator } = require('../middlewares/validator')
const diaryValidate = require('../validator/diary')
const { createDiaryInfo, searchDiaryInfo, getDiaryListInfo } = require('../controller/diary')

router.prefix('/api/diary')

router.put('/createDiary', loginCheck, genValidator(diaryValidate), async(ctx, next) => {
  const { time, title, content, status } = ctx.request.body
  const { id: userId, nickName, avatar } = ctx.session.userInfo
  ctx.body = await createDiaryInfo({ userId, time, title, content, status, nickName, avatar })
})

router.get('/getDiary', loginCheck, async(ctx, next) => {
  const { time } = ctx.query
  const { id: userId } = ctx.session.userInfo
  ctx.body = await searchDiaryInfo(userId, time)
})

router.get('/getDiaryList', async(ctx, next) => {
  const { pageIndex, pageSize } = ctx.query
  ctx.body = await getDiaryListInfo(pageIndex, pageSize)
})
module.exports = router