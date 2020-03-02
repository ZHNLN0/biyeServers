/**
 * @description user controller
 * @author 抖腿震地球
 */

const { createUser, getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo')

const doCrypto = require('../utils/cryp')

/**
 * 检查用户名是否已存在
 * @param {string} account 用户名
 */
async function isExist(account) {
  const userInfo = await getUserInfo(account) 
  if(userInfo) {
    return new SuccessModel(userInfo)
  } else {
    // 用户不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 
 * @param {string} account 用户账号
 * @param {password} password 密码 
 */
async function register({ account, password }) {
  // 先检查用户账号是否已存在
  const userInfo = await getUserInfo(account)
  if(userInfo) {
    // 用户存在
    console.log(userInfo)
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      account,
      password: doCrypto(password)
    })
    return new SuccessModel()
  } catch (err) {
    console.error(err.message, err.stack)
    return new ErrorModel(registerFailInfo)
  }
}

async function login(ctx, account, password) {
  const userInfo = await getUserInfo(account, doCrypto(password))
  console.log(userInfo)
  if(!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  if(ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel(userInfo)
}

module.exports = {
  isExist,
  register,
  login
}