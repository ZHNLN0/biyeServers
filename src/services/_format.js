/**
 * @description 数据格式化
 * @author 抖腿震地球
 */

const { DEFAULT_AVATAR, DEFAULT_SIGNATURE } = require('../conf/constant')

/**
 * 设置默认用户头像
 * @param {Object} obj 用户对象 
 */
function _formatUserAvatar(obj) {
  if(obj.avatar == null) {
    obj.avatar = DEFAULT_AVATAR
  }
  return obj
}

/**
 * 设置默认用户签名
 * @param {Object} obj 用户对象
 */
function _formatUserSignature(obj) {
  if(obj.signature == null) {
    obj.signature = DEFAULT_SIGNATURE
  }
  return obj
}

/**
 * 
 * @param {Array|Object} list  用户列表或者单个用户
 */
function formatUser(list) {
  if(list == null) {
    return list
  }
  if(list instanceof Array) {
    // 数组 用户列表
    return list.map(_formatUserAvatar).map(_formatUserSignature)
  }
  // 单个用户
  return _formatUserSignature(_formatUserAvatar(list)) 
}

module.exports = {
  formatUser
}