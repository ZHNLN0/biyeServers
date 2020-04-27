/**
 * @description diary services
 * @author 抖腿震地球
 */
const { Diary, User } = require('../db/model/index')

async function createDiary({ userId, time, title, content, status, nickName, avatar }) {
  const result = Diary.create({
    userId,
    time,
    title,
    content,
    status,
    nickName,
    avatar
  })
  const data = result.dataValues
  return data
}

async function searchDiary(userId, time) {
  const result = await Diary.findOne({
    attributes: ['time', 'title', 'content', 'status'],
    where: {
      userId,
      time
    },
    include: [
      {
        model: User,
        attributes: ['nickName']
      }
    ]
  })
  if(result == null) {
    // 未找到
    return result
  }
  return result.dataValues
}
async function getDiaryList(pageIndex, pageSize) {
  const result = await Diary.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex - pageSize,
    where: { status: 2 },
    order: [
      ['time', 'desc']
    ],
    attributes: ['nickName', 'avatar', 'time', 'title', 'content']
  })
  const diaryList = result.rows.map(row => row.dataValues)
  console.log(diaryList)
  return {
    diaryList,
    count: result.count
  }
}

module.exports = {
  createDiary,
  searchDiary,
  getDiaryList
}