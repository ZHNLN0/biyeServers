/**
 * @description 失败信息集合，包括 code 和 message
 * @author 抖腿震地球
 */

module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    code: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    code: 10002,
    message: '注册失败，请重试'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    code: 10003,
    message: '用户名不存在'
  },
  // 登录失败
  loginFailInfo: {
    code: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    code: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    code: 10006,
    message: '修改密码失败，请重试'
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    code: 10007,
    message: '上传文件尺寸过大'
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    code: 10008,
    message: '修改基本信息失败'
  },
  // json schema 校验失败
  jsonSchemaFileInfo: {
    code: 10009,
    message: '数据格式校验错误'
  },
  // 删除用户失败
  deleteUserFailInfo: {
    code: 10010,
    message: '删除用户失败'
  },
  // 添加关注失败
  addFollowerFailInfo: {
    code: 10011,
    message: '添加关注失败'
  },
  // 取消关注失败
  deleteFollowerFailInfo: {
    code: 10012,
    message: '取消关注失败'
  },
  // 创建微博失败
  createBillExistInfo: {
    code: 11001,
    message: '账单已存在，请修改账单'
  },
  createBillFileInfo: {
    code: 11002,
    message: '账单创建失败，请重试'
  },
  getBillFileInfo: {
    code: 11003,
    message: '账单查询失败，请重试'
  },
  updateBillFileInfo: {
    code: 11004,
    message: '账单更新失败，请重试'
  },
  // 删除微博失败
  deleteBlogFailInfo: {
    code: 11002,
    message: '删除微博失败，请重试'
  }
}
