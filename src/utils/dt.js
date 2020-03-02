/**
 * @description 时间相关的工具函数
 * @author 抖腿震地球
 */

const { format } = require('date-fns')

/**
 * 格式化时间
 * @param {string} str 时间字符串
 */

function timeFormat(str) {
  return format(new Date(str), 'yyyy.mm.dd hh:mm:ss')
}

module.exports = {
  timeFormat
}