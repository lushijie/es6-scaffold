/*
* @Author: lushijie
* @Date:   2017-05-12 15:12:14
* @Last Modified by:   lushijie
* @Last Modified time: 2017-05-12 15:12:39
*/
module.exports = function (req, res, next) {
  res.header('X-Hello', 'World')
  next()
}
