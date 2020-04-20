/**
 * @description bill controller
 * @author 抖腿震地球
 */

const { searchBillInfo, createBillInfo, getBillList, updateBill } = require('../services/bill')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBillFileInfo, createBillExistInfo, getBillFileInfo, updateBillFileInfo } = require('../model/ErrorInfo')
/**
 * @description 检查丹田是否已创建账单
 * @param {Number} userId userId
 * @param {Date} time 创建时间
 */
async function isExist(time) {
  const billInfo = await searchBillInfo(userId, time)
  if(billInfo) {
    return new SuccessModel(billInfo)
  } else {
    return new ErrorModel(createBillInfo)
  }
}

async function createBill({ userId, time, eat, shopping, trip, live, other }) {
  const billInfo = await searchBillInfo(userId, time)
  if(billInfo) {
    // 账单已存在
    return new ErrorModel(createBillExistInfo)
  }
  try {
    await createBillInfo({
      userId,
      time,
      eat,
      shopping,
      trip,
      live,
      other
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBillFileInfo)
  }
}

async function searchBill(userId, time) {
  const billInfoList = await searchBillInfo(userId, time)
  if(billInfoList) {
    return new SuccessModel(billInfoList)
  } else {
    return new ErrorModel(getBillFileInfo)
  }
}

async function getBills({ userId, pageIndex, pageSize }) {
  const bills = await getBillList({ userId, pageIndex, pageSize })
  if(bills) {
    return new SuccessModel(bills)
  } else {
    return new ErrorModel(getBillFileInfo)
  }
}

async function updateBillData({ userId, time, eat, trip, shopping, live, other }) {
  const result = await updateBill({ userId, time, eat, trip, shopping, live, other })
  if(result) {
    return new SuccessModel()
  } else {
    return new ErrorModel(updateBillFileInfo)
  }
}

module.exports = {
  isExist,
  createBill,
  searchBill,
  getBills,
  updateBillData
}