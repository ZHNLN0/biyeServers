/**
 * @description 数据模型入口文件
 * @author 抖腿震地球
 */

const User = require('./User')
const Bill = require('./Bill')

Bill.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Bill
}