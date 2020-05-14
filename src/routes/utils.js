/**
 * @description util api 
 * @author 抖腿震地球
 */

const router = require('koa-router')()
var fs = require('fs')
const path = require('path')
const { loginCheck } = require('../middlewares/loginCheck')

const { saveFile } = require('../controller/utils')

var uploadHost = 'http://localhost:3000/'
const savePath = path.resolve(__dirname, '../../uploadFiles').replace(/\\/g, '/')

router.prefix('/api/utils')

router.post('/upload', loginCheck, async(ctx, next) => {
  const { account } = ctx.session.userInfo
  var files = ctx.request.files['fileList']
  var result = []
  if(!Array.isArray(files)) {
    files = [files]
  }
  files && files.forEach(item => {
    var crrentPath = item.path.replace(/\\/g, '/')
    var fname = item.name// 原文件名称
    console.log(crrentPath, fname, savePath)
    if (item.size > 0 && crrentPath) {
      // 得到扩展名
      var extArr = fname.split('.')
      var ext = extArr[extArr.length - 1]
      var time = new Date().getTime()
      var nextPath = `${savePath}/${account}_${time}.${ext}`
      // 重命名文件
      fs.renameSync(crrentPath, nextPath)
      result.push(nextPath.slice(nextPath.lastIndexOf('/') + 1))
    }
  })

  
  ctx.body = `{
        "fileUrl":${JSON.stringify(result)}
    }`
})

module.exports = router
