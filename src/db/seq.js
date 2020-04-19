/**
 * @description sequelize 实例
 * @author 抖腿震地球
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

if(isTest) {
  conf.loggin = () => {}
}

// 线上环境配置：连接池最大为2，10000毫秒未使用被释放
if(isProd) {
  conf.pool = {
    max: 2,
    min: 0,
    idle: 10000
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq