/**
 * @description diary controller
 * @author 抖腿震地球
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createDiary, searchDiary, getDiaryList } = require('../services/diaries')
const { DEFAULT_AVATAR } = require('../conf/constant')
async function createDiaryInfo({ userId, time, title, content, status, nickName, avatar }) {
  const result = await searchDiary(userId, time)
  if(result) {
    return new ErrorModel()
  }
  try {
    if(!avatar) {
      avatar = DEFAULT_AVATAR
    }
    await createDiary({
      userId,
      time,
      title,
      content,
      status,
      nickName,
      avatar
    })
    return new SuccessModel()
  } catch(error) {
    console.log(error.message, error.stack)
    return new ErrorModel()
  }
}

async function searchDiaryInfo(userId, time) {
  const result = await searchDiary(userId, time)
  if(result) {
    return new SuccessModel(result)
  }else {
    return new ErrorModel()
  }
}

async function getDiaryListInfo(pageIndex, pageSize = 10) {
  const result = await getDiaryList(pageIndex, pageSize)
  if(result.diaryList.length = 0) {
    return new ErrorModel()
  }
  return result
}

module.exports = {
  createDiaryInfo,
  searchDiaryInfo,
  getDiaryListInfo
}
