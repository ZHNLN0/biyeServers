/**
 * @description 日记数据模型
 * @author 抖腿震地球
 */

const seq = require('../seq')
const { INTEGER, BIGINT, TEXT } = require('../types')

const Diary = seq.define('diary', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  time: {
    type: BIGINT,
    allowNull: false,
    unique: true,
    comment: '日记创建时间戳，唯一，不可为空'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '日记内容，不可为空'
  }
})

module.exports = Diary