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
    selectYears: 10, // Creates a dropdown of 15 years to control year
    format: 'dd-mm-yyyy' });

    $('.timepicker').pickatime({interval:15});

    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                      '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $('#guests-event').selectize({
        plugins:['remove_button'],
        persist: false,
        maxItems: null,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: [
            {email: 'brian@thirdroute.com', name: 'Brian Reavis'},
            {email: 'nikola@tesla.com', name: 'Nikola Tesla'},
            {email: 'someone@gmail.com'}
        ],
        render: {
            item: function(item, escape) {
                setTimeout(function() {$("#guests-event-selectized").focus();},4);
                return '<div class="guest-item">' +
                    (item.name ? '<span class="name">' + escape(item.name) + '</span><br>' : '') +
                    (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                '</div>';
            },
            option: function(item, escape) {
                var label = item.name || item.email;
                var caption = item.name ? item.email : null;
                return '<div class="guest-selectable">' +
                    '<span class="label">' + escape(label) + '</span><br>' +
                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                '</div>';
            }
        },
        createFilter: function(input) {
            var match, regex;

            // email@address.com
            regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[0]);

            // name <email@address.com>
            regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[2]);

            return false;
        },
        create: function(input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {email: input};
            }
            var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email : match[2],
                    name  : $.trim(match[1])
                };
            }
            alert('Invalid email address.');
            return false;
        }
    });
    var $guestsInput = $("#guests-event-selectized");

    $('#lab-guests-event').css('font-size', $('label').first().css('font-size'));
    $('h5.label').css('font-size', $('label').first().css('font-size'));
    $guestsInput.attr('style', 'width:100%');

    $guestsInput.on('change paste keyup focus', function() {
          if ($guestsInput.val() === "") $guestsInput.attr('style', 'width:100%');
    });
});

$(window).resize(function(){
      $('#lab-guests-event').css('font-size', $('label').first().css('font-size'));
      $('h5.label').css('font-size', $('label').first().css('font-size'));  
});


function initAutocomplete() {
  var input = document.getElementById('place-event');
  var searchBox = new google.maps.places.SearchBox(input);
}




