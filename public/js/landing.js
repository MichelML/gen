$(document).ready(function() {

  var $signinLink = $('#signin-link'),
      $googleButton = $('#google-btn');

  $signinLink.focus(function() {

    $googleButton.attr('src', 'img/btn_google_signin_pressed.png');

  });

  $signinLink.hover(function() {

     $googleButton.attr('src', 'img/btn_google_signin_focus.png');

  });

  $signinLink.on('focusout mouseout blur', function() {

     $googleButton.attr('src', 'img/btn_google_signin_normal.png');

  });

});
