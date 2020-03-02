/**
 * @description 用户数据模型
 * @author 抖腿震地球
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
  account: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户账号，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '登录密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  avatar: {
    type: STRING,
    comment: '用户头像图片地址'
  },
  signature: {
    type: STRING,
    comment: '用户个性签名'
  },
  roles: {
    type: DECIMAL,
    allowNull: false,
    defaultValus: 1,
    comment: '权限（1 普通用户，2 VIP用户）'
  }
})

module.exports = User