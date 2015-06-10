var express        = require('express');

var paymentHelper  = require('../helper/payment');
var responseHelper = require('../helper/response');

var router         = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hi HotelQuickly!'
  });
});

/* POST Payment */
router.post('/payment', function(req, res, next) {
  var data = req.body;

  if(paymentHelper.isPaypalCurrencies(data.currency) || paymentHelper.isCCAmex(parseInt(data.number))) {
    if(data.currency !== 'USD' && paymentHelper.isCCAmex(parseInt(data.number))) {
      return responseHelper.responseServerError(res, {resMessage: 'American Express credit card is possible to use only for USD'})
    } else {
      paymentHelper.paymentWithPayPal(data, function(isError, result) {
        if(isError) {
          var newArr = result.response.details.map(function(obj) {
            var rObj = {};
            rObj = obj.field.replace(/_/g, ' ') + ": " + obj.issue;

            return rObj;
          })

          return responseHelper.responseServerError(res, {resMessage: newArr.join('</br>')})
        } else {
          return responseHelper.responseSuccess(res, data)
        }
      })
    }
  } else {
    paymentHelper.paymentWithBraintree(data, function(isError, result) {
      if(isError) {
        return responseHelper.responseServerError(res, {resMessage: result.message.replace(/\n/g, '</br>')})
      } else {
        return responseHelper.responseSuccess(res, data)
      }
    })
  }
});


module.exports = router;
