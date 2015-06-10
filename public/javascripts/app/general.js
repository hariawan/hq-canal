if(typeof General != "object") { window.General = {} }

General.notifier = function(message, type) {
  $('.ajax-messages').hide();

  $('.'+type+'-msg-ajax').show();
  $('.'+type+'-msg-ajax p').html(message);

  setTimeout(function() {
    $('.'+type+'-msg-ajax').fadeOut(15000);
  }, 2000)
}