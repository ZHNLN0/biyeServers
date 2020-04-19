/**
 * @description 账单数据模型
 * @author 抖腿震地球
 */

const seq = require('../seq')
const { INTEGER, BIGINT } = require('../types')

const Bill = seq.define('bill', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  time: {
    type: BIGINT,
    allowNull: false,
    unique: true,
    comment: '账单创建时间，唯一，不可为空'
  },
  eat: {
    type: INTEGER,
    comment: '账单食用消费'
  },
  shopping: {
    type: INTEGER,
    comment: '账单购物消费'
  },
  trip: {
    type: INTEGER,
    comment: '账单交通出行消费'
  },
  live: {
    type: INTEGER,
    comment: '账单日常用品消费'
  },
  other: {
    type: INTEGER,
    comment: '账单其他消费'
  }
})

module.exports = Bill