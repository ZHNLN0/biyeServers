/**
 * @description bill 数据格式校验
 * @author 抖腿震地球
 */

const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    time: {
      type: 'number'
    },
    eat: {
      type: 'number'
    },
    shopping: {
      type: 'number'
    },
    trip: {
      type: 'number'
    },
    live: {
      type: 'number'
    }, 
    other: {
      type: 'number'
    }
  }
}

/**
 * 校验账单数据格式
 * @param {Object} data 账单数据
 */
function billValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = billValidate