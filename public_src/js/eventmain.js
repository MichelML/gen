// INITIALIZE THE DATE AND TIME INPUTS WITH PICKADATE.JS PLUGIN
$(document).ready(function(event) {

    var dayInMilliSeconds = 24 * 60 * 60 * 1000,
        timeZoneAdjustment = new Date().getTimezoneOffset() * 60 * 1000;

    $('.datepicker').pickadate({

        selectMonths: true,
        selectYears: 10,
        format: 'yyyy-mm-dd'

    });

    $('.timepicker').pickatime({

        interval: 15,
        format: 'HH:i'

    });

    var $startdate = $('#startdate-event').pickadate();
    startDatePicker = $startdate.pickadate('picker');
    startDatePicker.set('select', Date.now() + dayInMilliSeconds);
    var startDateCurrentVal = $startdate.val();
    startDatePicker.set('min', Date.now());

    var $starttime = $('#starttime-event').pickatime();
    var startTimePicker = $starttime.pickatime('picker');
    startTimePicker.set('select', '12:00');

    var $enddate = $('#enddate-event').pickadate();
    var endDatePicker = $enddate.pickadate('picker');
    endDatePicker.set('select', Date.now() + dayInMilliSeconds);
    var endDateCurrentVal = $enddate.val();
    endDatePicker.set('min', startDateCurrentVal);

    var $endtime = $('#endtime-event').pickatime();
    var endTimePicker = $endtime.pickatime('picker');
    endTimePicker.set('select', '13:00');
    endTimePicker.set('min', '12:15');

    $startdate.on('change', function() {

        startDateCurrentVal = $startdate.val();

        //set enddate picker to startdate value
        if (Date.parse(startDateCurrentVal) > Date.parse(endDateCurrentVal)) {
        
            endDateCurrentVal = $startdate.val();
            endDatePicker.set('select', endDateCurrentVal);

        }

        else if (areDatesEqual(startDateCurrentVal, endDateCurrentVal) && isEndTimeInferiorOrEqual($starttime, $endtime)) {
        
            setEndDateAndTimeValuesOnEqualDates($starttime.val()); 
        
        } 

        endDatePicker.set('min', startDateCurrentVal);

    });

    $enddate.on('change', function() {
    
        endDateCurrentVal = $enddate.val();

        if (areDatesEqual(startDateCurrentVal, endDateCurrentVal) && isEndTimeInferiorOrEqual($starttime, $endtime)) {
        
            setEndDateAndTimeValuesOnEqualDates($starttime.val()); 
        
        } 

        else {
        
            endTimePicker.set('min', '00:00');
        
        }

    });

    $starttime.on('change', function() {

        if (areDatesEqual(startDateCurrentVal, endDateCurrentVal) && isEndTimeInferiorOrEqual($starttime, $endtime)) {
        
            setEndDateAndTimeValuesOnEqualDates($starttime.val()); 
        
        } 

        else if (areDatesEqual(startDateCurrentVal, endDateCurrentVal)) {
        
            setEndTimeMinValue($starttime.val()); 
        
        }

    });

    function setEndDateAndTimeValuesOnEqualDates(starttime) {

        if (starttime === '23:45') {
        
            endTimePicker.set('min', '00:00');
            endTimePicker.set('select', '00:00');
            endDatePicker.set('select', [parseInt(startDateCurrentVal.substr(0,4)), parseInt(startDateCurrentVal.substr(5,2)) - 1, parseInt(startDateCurrentVal.substr(8)) + 1]);

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

    function setEndTimeMinValue(starttime) {
    
        if (/^[0-9]{1,2}:45$/.test(starttime)) {

            endTimePicker.set('min', starttime.substr(0, 1) + (parseInt(starttime[1]) + 1) + ":00");       

        }
        
        else {

            endTimePicker.set('min', starttime.substr(0, 3) + (parseInt(starttime.substr(3)) + 15));       
        
        }

    }

    function isEndTimeInferiorOrEqual(starttime, endtime) {
    
        // uses a fake date (01/01/2011) to compare time
        return Date.parse('01/01/2011 ' + endtime.val()) <= Date.parse('01/01/2011 ' + starttime.val()); 

    }

    function areDatesEqual(startdt,enddt) {
        
        return Date.parse(startdt) === Date.parse(enddt);
    
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
        $spinnerdiv = $('#spinnerdiv-white-event'),
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
