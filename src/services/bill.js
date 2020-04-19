/**
 * @description bill service
 * @author 抖腿震地球
 */
const { Bill } = require('../db/model/index')


async function searchBillInfo(userId, time, type) {
 
  // 执行查询语句
  const result = await Bill.findOne({
    attributes: ['time', 'eat', 'shopping', 'trip', 'live', 'other'],
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

async function getBillList({ userId, pageIndex = 1, pageSize = 10 }) {
  const result = await Bill.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex - pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: Bill,
        attributes: ['time', 'eat', 'trip', 'shopping', 'live', 'other'],
        where: { userId }
      }
    ]
  })
  const billList = result.rows.map(row => row.dataValues)
  return {
    count: result.count,
    billList
  }
}

async function createBillInfo({ userId, time, eat, shopping, trip, live, other }) {
  console.log(userId, time, eat, shopping, trip, live, other)
  const result = await Bill.create({
    userId,
    time,
    eat,
    shopping,
    trip,
    live,
    other
  })
  const data = result.dataValues
  return data
}

async function updateBill({ userId, time, eat, shopping, trip, live, other }) {
  const whereOpt = {
    userId,
    time
  }
  const updateData = {
    eat,
    shopping,
    trip,
    live,
    other
  }
  const result = await Bill.update(updateData, {
    where: whereOpt
  })
  return result[0] > 0
}

module.exports = {
  searchBillInfo,
  createBillInfo,
  getBillList,
  updateBill
}