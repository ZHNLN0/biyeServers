/**
 * @description res 的数据模型
 * @author 抖腿震地球
 */

class BaseModel {
  constructor({ code, data, message }) {
    this.code = code
    if(data) {
      this.data = data
    }
    if(message) {
      this.message = message
    }
  }
}

// 成功数据模型
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      code: 20000,
      data
    })
  }
}

// 失败数据模型
class ErrorModel extends BaseModel {
  constructor({ code, message }) {
    super({
      code,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}