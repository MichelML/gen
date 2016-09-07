  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    //hide button
    //$("#g-signin2").hide();
  }

 function renderButton() {
    gapi.signin2.render('g-signin2', {
      'scope': 'profile email',
      'width':240,
      'height': 50,
      'longtitle':true,
      'theme': 'light',
      'onsuccess': onSignIn
      // 'onfailure': onFailure
    });
 }
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

$(".button-collapse").sideNav();

$(document).ready(function() {
  $('#email-account').focus();
});


$(document).ready(function(event) {
    $('#name-event').focus();
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'dd-mm-yyyy' });
    $('.timepicker').pickatime({interval:15});
});

function initAutocomplete() {
  var input = document.getElementById('place-event');
  var searchBox = new google.maps.places.SearchBox(input);
}


