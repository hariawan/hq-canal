INDEX = (function (window, document) {

  var init = function () {
    buySubmit();
    bindBackToForm();
  };

  var buySubmit = function() {
    $('.payment-form').on('submit', function(e) {
      e.preventDefault();

      $.ajax({
        url: $(this).attr('action'),
        type: 'POST',
        data: $(this).serialize()
      })
      .done(function(res) {
        var data = res.data;

        $('.payment-form').hide();
        $('.success-alert').removeClass('none');
      })
      .fail(function(res) {
        General.notifier(res.responseJSON.message || 'Something went wrong while proceed your order', 'error')
      })
    });
  };

  var bindBackToForm = function() {
    $(document).on('click', '.back-form', function() {
      $('.success-alert').addClass('none');
      $('.payment-form').show();

      return false;
    })
  }

  return {
    init: init
  };

})(window, document);

$(function () {
  INDEX.init();
});
