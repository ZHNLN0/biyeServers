/**
 * @description user 数据格式校验
 * @author 抖腿震地球
 */

const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    account: {
      type: 'string',
      maxLength: 20,
      minLength: 5
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 5
    },
    nickName: {
      type: 'string',
      maxLength: 20,
      minLength: 2
    },
    avatar: {
      type: 'string',
      maxLength: 255
    },
    roles: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}


/**
 * 检验用户的数据格式
 * @param {Object} data 校验的用户数据
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate