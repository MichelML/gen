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
        $footer = $('footer');

        function setSpinnerHeight() {

            $spinnerdiv.css('height', '' + ($window.height() - $nav.height()) + 'px');
        }
        setSpinnerHeight();

    $window.resize(function() {

        setSpinnerHeight();

    });

})
