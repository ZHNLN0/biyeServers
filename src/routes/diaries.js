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
  const { pageIndex = 1, pageSize = 10, type = 'index' } = ctx.query
  const { id: userId } = ctx.session.userInfo
  const params = {
    pageIndex,
    pageSize
  }
  if(type === 'self') {
    params.userid = userId
  }
  ctx.body = await getDiaryListInfo(params)
})
module.exports = router