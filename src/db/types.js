/**
 * @description 封装 sequelize 数据类型
 * @author 抖腿震地球
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BIGINT: Sequelize.BIGINT,
  BOOLEAN: Sequelize.BOOLEAN,
  DATE: Sequelize.DATE
}