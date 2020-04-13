/**
 * @description user controller
 * @author 抖腿震地球
 */

const path = require('path')
const fse = require('fs-extra')
const { createUser, getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo')

const doCrypto = require('../utils/cryp')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

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
async function register({ account, password, roles }) {
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

/**
 * 用户登录
 * @param {Object} ctx 
 * @param {string} account 用户名
 * @param {string} password 密码
 */
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

/**
 * 修改用户信息
 * @param {Object} ctx 
 * @param {string} nickName 昵称
 * @param {Object} avatar 用户头像
 * @param {string} signature 个性签名
 */
async function changeInfo(ctx, { nickName, avatar, signature }) {
  const { account } = ctx.session.userInfo
  if(!nickName) {
    nickName = account 
  }
  if(avatar) {
    const { name, size, type } = avatar
    if(size > MAX_SIZE) {
      await fse.remove(filePath)
    }
  }
}

module.exports = {
  isExist,
  register,
  login
}