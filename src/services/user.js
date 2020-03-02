/**
 * @description user serice
 * @author 抖腿震地球
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 
 * @param {string} account 账号
 * @param {string} password 密码
 */
async function getUserInfo(account, password) {
  const whereOpt = {
    account
  }
  if(password) {
    Object.assign(whereOpt, { password })
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'account', 'nickName', 'avatar', 'signature'],
    where: whereOpt
  })
  if(result == null) {
    // 未找到
    return result
  }

  // 格式化
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * 创建用户
 * @param {string} account 账号
 * @param {string} password 密码
 * @param {string} nickName 昵称
 */
async function createUser({ account, password, nickName }) {
  const result = await User.create({
    account,
    password,
    nickName: nickName ? nickName : account
  })

  const data = result.dataValues
  return data
}

module.exports = {
  createUser,
  getUserInfo
}