/**
 * @description 存储配置
 * @author 抖腿震地球
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: '6379',
  host: '114.55.29.41'
}

let MYSQL_CONF = {
  host: '114.55.29.41',
  user: 'root',
  password: 'zhn@779602',
  port: '3306',
  database: 'biye_dev'
}

if(isProd) {
  REDIS_CONF = {
    port: '6379',
    host: '114.55.29.41'
  }

  MYSQL_CONF = {
    port: '3306',
    user: 'root',
    host: '114.55.29.41',
    password: 'zhn@779602',
    database: 'biye_production'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}

