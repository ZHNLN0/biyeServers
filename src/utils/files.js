const fs = require('fs')

const uploadHost = 'http://localhost:3000'

export function saveFile(files) {
  const result = []
  if(!Array.isArray(files)) {
    files = [files]
  }
  files && files.forEach(item => {
    var path = item.path.replace(/\\/g, '/')
    var fname = item.name// 原文件名称
    var nextPath = path + fname
    if (item.size > 0 && path) {
      // 得到扩展名
      var extArr = fname.split('.')
      var ext = extArr[extArr.length - 1]
      var nextPath = path + '.' + ext
      // 重命名文件
      fs.renameSync(path, nextPath)

      result.push(uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1))
    }
  })
  return result
}