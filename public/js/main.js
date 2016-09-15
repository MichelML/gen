$(".button-collapse").sideNav();

$(document).ready(function() {
  var $emailAccount = $('#email-account'),
      $signinLink = $('#signin-link'),
      $googleButton = $('#google-btn');
  //$emailAccount.focus();
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

$(document).ready(function(event) {
    $('#name-event').focus();

    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10, // Creates a dropdown of 15 years to control year
    format: 'dd-mm-yyyy' });

    $('.timepicker').pickatime({interval:15});
});

$(window).resize(function(){
      $('#lab-guests-event').css('font-size', $('label').first().css('font-size'));
      $('h5.label').css('font-size', $('label').first().css('font-size'));  
});


function initAutocomplete() {
  var input = document.getElementById('place-event');
  var searchBox = new google.maps.places.SearchBox(input);
}

$(".button-collapse").sideNav();

$(document).ready(function(event) {
  $('#email-account').focus();
});
