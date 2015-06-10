exports.responseSuccess = function(res, obj) {
  var resultPrint     = {}
  resultPrint.id      = require('node-uuid').v4()
  resultPrint.status  = 200
  resultPrint.message = obj.resMessage || 'success'
  resultPrint.data    = obj

  res.status(resultPrint.status).json(resultPrint)
}

exports.responseNotExist = function(res, obj) {
  var resultPrint     = {}
  resultPrint.id      = require('node-uuid').v4()
  resultPrint.status  = 404
  resultPrint.message = obj.resMessage || 'not exist'
  resultPrint.data    = obj

  res.status(resultPrint.status).json(resultPrint)
}

exports.responseServerError = function(res, obj) {
  var resultPrint     = {}
  resultPrint.id      = require('node-uuid').v4()
  resultPrint.status  = 500
  resultPrint.message = obj.resMessage || 'Something went wrong'
  resultPrint.data    = obj

  res.status(resultPrint.status).json(resultPrint)
}