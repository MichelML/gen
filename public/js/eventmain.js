// INITIALIZE THE DATE AND TIME INPUTS WITH PICKADATE.JS PLUGIN
$(document).ready(function(event) {
    
    var dates = getASpecificDate(),
        tomorrow = dates.getTomorrow(),
        yesterday = dates.getYesterday(),
        today = dates.getToday();

    $('.datepicker').pickadate({

        selectMonths: true,
        selectYears: 10,
        format: 'd mmmm, yy',
        min: [today.day, today.month, today.year].join('-') 

    });

    $('.timepicker').pickatime({

        interval: 15,
        format: 'H:i'

    });

    var $startdate = $('#startdate-event').pickadate();
    var startDatePicker = $startdate.pickadate('picker');
    startDatePicker.set('select', [tomorrow.year, tomorrow.month, tomorrow.day]);

    var $starttime = $('#starttime-event').pickatime();
    var startTimePicker = $starttime.pickatime('picker');
    startTimePicker.set('select', '12:00');

    var $enddate = $('#enddate-event').pickadate();
    var endDatePicker = $enddate.pickadate('picker');
    endDatePicker.set('select', [tomorrow.year, tomorrow.month, tomorrow.day]);

    var $endtime = $('#endtime-event').pickatime();
    var endTimePicker = $endtime.pickatime('picker');
    endTimePicker.set('select', '13:00');


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

    function reconvertInRealDateObject(date) {
    
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
