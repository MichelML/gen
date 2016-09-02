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



//resizing trick for proper tablet rendering of the footer element
var windowInnerWidth;
var $footer = $('footer');
var initialFooterVals = $footer.css(['position', 'min-width', 'bottom']);

var isWidthBetween601and999px = function() {
  windowInnerWidth = window.innerWidth;
  return windowInnerWidth > 600 && windowInnerWidth < 1000;
};
var isPortrait = function() {
  return window.innerWidth < window.innerHeight;
};
var isMobile = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

var wasPreviouslyTabletPortrait = false;

var updateFooterStyle = function() {
    $footer.css({
      'position':'absolute', 
      'min-width':'100%', 
      'bottom':'0'
    });
};

$(document).ready(function(event) {
  updateFooterStyle();
  $('#email-account').focus();
});
