$(document).ready(function(event) {

    $('.datepicker').pickadate({

        selectMonths: true,
        selectYears: 10,
        format: 'dd-mm-yyyy'

    });

    $('.timepicker').pickatime({

        interval: 15

    });

});

function initAutocomplete() {

    var input = document.getElementById('place-event');
    var searchBox = new google.maps.places.SearchBox(input);

}

$(document).ready(function() {

    var $window = $(window),
        $spinnerdiv = $('#spinnerdiv-white'),
        $nav = $('nav'),
        $successMessage = $('#success-submit');
    
    // these elements must be initiated with jquery 
    // so they vertical align properly
    $spinnerdiv.hide();
    $successMessage.hide();

    function setSpinnerHeight() {

        $spinnerdiv.css('height', '' + ($window.height() - $nav.height()) + 'px');
    }
    setSpinnerHeight();

    $window.resize(function() {

        setSpinnerHeight();

    });

});

$(document).ready(function() {

    $('.modal-trigger').leanModal();

});
