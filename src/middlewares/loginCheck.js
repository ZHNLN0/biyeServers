/**
 * @description 登录验证中间件
 * @author 抖腿震地球
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 验证是否登录
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    // 存在则已登录状态
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

module.exports = {
  loginCheck
}