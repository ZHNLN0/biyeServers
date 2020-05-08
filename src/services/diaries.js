/**
 * @description diary services
 * @author 抖腿震地球
 */
const { Diary, User } = require('../db/model/index')
const { formatDiary } = require('./_format')

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
async function getDiaryList({ pageIndex, pageSize, userId }) {
  let whereOpt = {
    status: 2
  }
  if(userId !== null) {
    whereOpt = {
      userId
    }
  }
  const result = await Diary.findAndCountAll({
    order: [
      ['time', 'desc']
    ],
    attributes: ['time', 'title', 'content'],
    include: [
      {
        model: User,
        attributes: ['nickName', 'avatar']
      }
    ],
    offset: pageSize * pageIndex - pageSize,
    limit: pageSize - 0, // 每页多少条
    where: whereOpt  
  })
  const diaryList = formatDiary(result.rows)
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