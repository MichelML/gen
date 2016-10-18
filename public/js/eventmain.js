// INITIALIZE THE DATE AND TIME INPUTS WITH PICKADATE.JS PLUGIN
$(document).ready(function(event) {

    var dates = getASpecificDate(),
        defaultDay = dates.getTomorrow(),
        yesterday = dates.getYesterday(),
        minimumDay = dates.getToday();

    $('.datepicker').pickadate({

        selectMonths: true,
        selectYears: 10,
        format: 'yyyy-mm-dd',
        min: [minimumDay.year, minimumDay.month, minimumDay.day].join('-')

    });

    $('.timepicker').pickatime({

        interval: 15,
        format: 'HH:i'

    });

    var $startdate = $('#startdate-event').pickadate();
    var startDatePicker = $startdate.pickadate('picker');
    startDatePicker.set('select', [defaultDay.year, defaultDay.month, defaultDay.day]);
    var startDateCurrentVal = $startdate.val();
    var startDate = new Date(startDateCurrentVal);

    var $starttime = $('#starttime-event').pickatime();
    var startTimePicker = $starttime.pickatime('picker');
    startTimePicker.set('select', '12:00');

    var $enddate = $('#enddate-event').pickadate();
    var endDatePicker = $enddate.pickadate('picker');
    endDatePicker.set('select', [defaultDay.year, defaultDay.month, defaultDay.day]);
    var endDateCurrentVal = $enddate.val();
    var endDate = new Date(endDateCurrentVal);

    var $endtime = $('#endtime-event').pickatime();
    var endTimePicker = $endtime.pickatime('picker');
    endTimePicker.set('select', '13:00');
    endTimePicker.set('min', '12:15');

    $startdate.on('change', function() {
        
        startDateCurrentVal = $startdate.val();
        startDate.setFullYear(startDateCurrentVal.substr(0,4), startDateCurrentVal.substr(5,2), startDateCurrentVal.substr(8)); 

        //set enddate picker to startdate value
        if (startDate > endDate) {
        
            endDateCurrentVal = startDateCurrentVal;
            endDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            endDatePicker.set('select', endDateCurrentVal, {format: 'yyyy-mm-dd'});
            endDatePicker.set('min', endDateCurrentVal, {format: 'yyyy-mm-dd'});

        }

        else if (areDatesEqual(startDate, endDate) && isEndTimeInferiorOrEqual($starttime, $endtime)) {
        
            setEndDateAndTimeValuesOnEqualDates($starttime.val()); 
        
        } 

        else {
        
            endDatePicker.set('min', startDate.getTime());
        
        }

    });

    $enddate.on('change', function() {
    
        endDateCurrentVal = $enddate.val();
        endDate.setFullYear(endDateCurrentVal.substr(0,4), endDateCurrentVal.substr(5,2), endDateCurrentVal.substr(8)); 

        if (areDatesEqual(startDate, endDate) && isEndTimeInferiorOrEqual($starttime, $endtime)) {
        
            setEndDateAndTimeValuesOnEqualDates($starttime.val()); 
        
        } 

        else {
        
            endTimePicker.set('min', '00:00');
        
        }

    });

    $starttime.on('change', function() {

        if (areDatesEqual(startDate, endDate) && isEndTimeInferiorOrEqual($starttime, $endtime)) {
        
            setEndDateAndTimeValuesOnEqualDates($starttime.val()); 
        
        } 

    });

    function getASpecificDate() {

        var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        var today = new Date(new Date().getTime());
        var dateGiver = {};

        dateGiver.getTomorrow = function() {

            return {

                year: tomorrow.getFullYear(),
                month: tomorrow.getMonth(),
                day: tomorrow.getDate()

            };

        };

        dateGiver.getYesterday = function() {

            return {

                year: yesterday.getFullYear(),
                month: yesterday.getMonth(),
                day: yesterday.getDate()

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

    function setEndDateAndTimeValuesOnEqualDates(starttime) {

        if (starttime === '23:45') {
        
            endTimePicker.set('min', '00:00');
            endTimePicker.set('select', '00:00');
            endDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
            endDatePicker.set('select', endDate);
        }

        else if (/^[0-9]{1,2}:45$/.test(starttime)) {

            endTimePicker.set('min', starttime.substr(0, 1) + (parseInt(starttime[1]) + 1) + ":00");       
            endTimePicker.set('select', starttime.substr(0, 1) + (parseInt(starttime[1]) + 1) + ":00");       

        }
        
        else {

            endTimePicker.set('min', starttime.substr(0, 3) + (parseInt(starttime.substr(3)) + 15));       
            endTimePicker.set('select', starttime.substr(0, 3) + (parseInt(starttime.substr(3)) + 15));       
        
        }

    }

    function isEndTimeInferiorOrEqual(starttime, endtime) {
    
        // uses a fake date (01/01/2011) to compare time
        return Date.parse('01/01/2011 ' + endtime.val()) <= Date.parse('01/01/2011 ' + starttime.val()); 

    }

    function areDatesEqual(startdt,enddt) {
        
        return startdt.getTime() === enddt.getTime();
    
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
