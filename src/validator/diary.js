/**
 * @description diary 数据格式校验
 * @author 抖腿震地球
 */

const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    time: {
      type: 'number'
    },
    title: {
      type: 'string',
      maxLength: 20,
      minLength: 1
    },
    content: {
      type: 'string',
      maxLength: 300,
      minLength: 1
    },
    status: {
      type: 'number'
    }
  }
}

function diaryValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = diaryValidate