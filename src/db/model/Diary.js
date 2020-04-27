/**
 * @description 日记数据模型
 * @author 抖腿震地球
 */

const seq = require('../seq')
const { INTEGER, BIGINT, TEXT, STRING } = require('../types')

const Diary = seq.define('diary', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '日子作者'
  },
  avatar: {
    type: STRING,
    comment: '作者头像'
  },
  time: {
    type: BIGINT,
    allowNull: false,
    unique: true,
    comment: '日记创建时间戳，唯一，不可为空'
  },
  title: {
    type: STRING,
    allowNull: false,
    comment: '日记的标题'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '日记内容，不可为空'
  },
  status: {
    type: INTEGER,
    allowNull: false,
    comment: '日记可见状态，1为仅自己可见，2为所有人可见'
  }
})

module.exports = Diary