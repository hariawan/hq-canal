var paypal  = require('paypal-rest-sdk');
var braintree = require('braintree');

var config = require('../config');

paypal.configure(config.paypal);

var gateway = braintree.connect({
  environment : braintree.Environment.Sandbox,
  merchantId  : config.braintree.merchantId,
  publicKey   : config.braintree.publicKey,
  privateKey  : config.braintree.privateKey
});

var payment = {
  getCreditCardType: function(num) {
    if(/^4[0-9]/.test(num)) {
      return 'visa'
    } else if(/^5[1-5]/.test(num)) {
      return 'mastercard'
    } else if(/^6(?:011|5[0-9]{2})/.test(num)) {
      return 'discover'
    } else if(/^3[47]/.test(num)) {
      return 'amex'
    } else if(/^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/.test(num)) {
      return 'maestro'
    } else {
      return 'else'
    }
  },

  isPaypalCurrencies: function(currency) {
    return ['USD', 'EUR', 'AUD'].indexOf(currency) >= 0;
  },

  isCCAmex: function(num) {
    return /^3[47]/.test(num);
  },

  paymentWithPayPal: function(data, callback) {
    var ccInformation = {
      type: payment.getCreditCardType(data.number),
      number: data.number,
      expire_month: data.expmonth,
      expire_year: data.expyear,
      cvv2: data.ccv,
      first_name: data.fullname.split(' ')[0],
      last_name: data.fullname.split(' ')[1],
    }

    paypal.creditCard.create(ccInformation, function(error, credit_card) {
      if(error) {
        callback(true, error)
      } else {
        callback(false, credit_card);
      }
    })
  },

  paymentWithBraintree: function(data, callback) {
    var ccInformation = {
      number: data.number,
      expirationDate: data.expmonth+'/'+data.expyear
    }

    gateway.transaction.sale({
      amount: '1.00',
      creditCard: ccInformation
    }, function (err, result) {
      if(result.success) {
        callback(false, result.transaction.id)
      } else {
        callback(true, result)
      }
    });
  }
}

module.exports = payment;