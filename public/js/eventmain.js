$(".button-collapse").sideNav();

$(document).ready(function(event) {
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10, // Creates a dropdown of 15 years to control year
    format: 'dd-mm-yyyy' });

    $('.timepicker').pickatime({interval:15});
});

$(window).resize(function(){
      $('#lab-guests').css('font-size', $('label').first().css('font-size'));
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
