/**
 * @description diary controller
 * @author 抖腿震地球
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createDiary, searchDiary } = require('../services/diaries')

async function createDiaryInfo({ userId, time, title, content }) {
  const result = await searchDiary(userId, time)
  if(result) {
    return new ErrorModel()
  }
  try {
    await createDiary({
      userId,
      time,
      title,
      content
    })
    return new SuccessModel()
  } catch(error) {
    console.log(error.message, error.stack)
    return new ErrorModel()
  }
}

module.exports = {
  createDiaryInfo
}
