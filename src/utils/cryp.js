/**
 * @description 加密方法
 * @author 抖腿震地球
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * 
 * @param {string} content 明文 
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `${content}&${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto