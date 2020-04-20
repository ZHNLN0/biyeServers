/**
 * @description diary services
 * @author 抖腿震地球
 */
const { Diary } = require('../db/model/index')

async function createDiary({ userId, time, title, content }) {
  const result = Diary.create({
    userId,
    time,
    title,
    content
  })
  const data = result.dataValues
  return data
}

async function searchDiary({ userId, time }) {
  const result = await Diary.findOne({
    attributes: ['time', 'title', 'content'],
    where: {
      userId,
      time
    }
  })
  if(result == null) {
    // 未找到
    return result
  }
  return result.dataValues
}
module.exports = {
  createDiary,
  searchDiary
}