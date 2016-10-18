// INITIALIZE THE DATE AND TIME INPUTS WITH PICKADATE.JS PLUGIN
$(document).ready(function(event) {
    
    var dates = getASpecificDate(),
        tomorrow = dates.getTomorrow(),
        yesterday = dates.getYesterday(),
        today = dates.getToday();

    $('.datepicker').pickadate({

        selectMonths: true,
        selectYears: 10,
        format: 'dd-mm-yyyy',
        min: [today.day, today.month, today.year].join('-') 

    });

    $('.timepicker').pickatime({

        interval: 15

    });

    var $startdate = $('#startdate-event').pickadate();
    var picker = $startdate.pickadate('picker');
    picker.set('select', [tomorrow.year, tomorrow.month, tomorrow.day]);

    $starttime = $('#starttime-event').val('12:00 PM');

    $enddate = $('#enddate-event').pickadate();
    picker = $enddate.pickadate('picker');
    picker.set('select', [tomorrow.year, tomorrow.month, tomorrow.day]);

    $endtime = $('#endtime-event').val('1:00 PM');

    function getASpecificDate() {

        var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        var today = new Date(new Date().getTime());
        var dateGiver = {};

        dateGiver.getTomorrow = function() {

            return {

                year: tomorrow.getFullYear(),
                month: tomorrow.getMonth(),
                day:tomorrow.getDate()

            };

        };

        dateGiver.getYesterday = function() {
        
            return {

                year: yesterday.getFullYear(),
                month: yesterday.getMonth(),
                day:yesterday.getDate()

            };
        
        };

        dateGiver.getToday = function() {
        
            return {

                year: today.getFullYear(),
                month: today.getMonth(),
                day: today.getDate()

            };
        
        };

        return dateGiver;

    }

    function convertInRealDateObject(date) {
    
        return new Date(date.year,date.month,date.day);

    }

});

//INITIALIZE THE EVENT'S LOCATION INPUT WITH GOOGLE MAPS
function initAutocomplete() {

    var input = document.getElementById('place-event');
    var searchBox = new google.maps.places.SearchBox(input);

}

// INITIALIZE SPINNER WHILE THE SERVER IS RECEIVING THE EVENT'S DATA
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

// INITIALIZE FORM COMPLETION CONFIRMATION MODAL
$(document).ready(function() {

    $('.modal-trigger').leanModal();

});
