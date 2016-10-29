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


$(window).resize(function() {

    $('#lab-guests').css('font-size', $('label').first().css('font-size'));

    $('h5.label').css('font-size', $('label').first().css('font-size'));

});

$(document).ready(function(event) {

    var $eventName = $('#name-event'),
        $eventType = $('#type-event'),
        $eventHost = $('#host-event'),
        $eventTel = $('#tel-event'),
        $eventEmail = $('#mail-event'),
        $eventUrl = $('#link-event'),
        $eventGuests = $('#guests-event'),
        $timesRow = $('#starttimes'),
        $eventStartDate = $('#startdate-event'),
        $eventStartTime = $('#starttime-event'),
        $eventEndDate = $('#enddate-event'),
        $eventEndTime = $('#endtime-event'),
        $eventLocation = $('#place-event'),
        $eventDetails = $('#details-event'),
        $createEvent = $('#event-button');

    $('#event-creation').on('keyup change', function() {

        if (formIsValid()) {

           $createEvent.prop('disabled', false);

        }

        else {
            
           $createEvent.prop('disabled', true);

        }

    });

    var eventNameErrorMessage = initErrorMessage($eventName,'(required) use letters, numbers and spaces only');
    $eventName.on('keyup blur change', function() {
    
        toggleValidationClasses($eventName, validator.checkEventName, eventNameErrorMessage); 

    });

    var eventTypeErrorMessage = initErrorMessage($eventType, 'use letters and spaces only, or leave empty');
    $eventType.on('keyup blur change', function() {
    
        toggleValidationClasses($eventType, validator.checkEventType, eventTypeErrorMessage); 

    });

    var eventHostErrorMessage = initErrorMessage($eventHost, '(required) use letters and space only');
    $eventHost.on('keyup blur change', function() {
    
        toggleValidationClasses($eventHost, validator.checkEventHost, eventHostErrorMessage); 

    });

    var eventLocationErrorMessage = initErrorMessage($eventLocation, '(required) location must contain 1 to 1000 characters');
    $eventLocation.on('keyup blur change', function() {
    
        toggleValidationClasses($eventLocation, validator.checkEventLocation, eventLocationErrorMessage); 

    });

    var startDateErrorMessage = initErrorMessage($eventStartDate, '(required) a date must be selected');
    $eventStartDate.on('change', function() {
    
        toggleValidationClasses($eventStartDate, validator.checkEventDate, startDateErrorMessage); 

    });

    var startTimeErrorMessage = initErrorMessage($eventStartTime, '(required) a time must be selected');
    $eventStartTime.on('change', function() {
    
        toggleValidationClasses($eventStartTime, validator.checkEventTime, startTimeErrorMessage); 

    });

    var endDateErrorMessage = initErrorMessage($eventEndDate, '(required) a date must be selected');
    $eventEndDate.on('change', function() {
    
        toggleValidationClasses($eventEndDate, validator.checkEventDate, endDateErrorMessage); 

    });

    var endTimeErrorMessage = initErrorMessage($eventEndTime, '(required) a time must be selected')
    $eventEndTime.on('change', function() {
    
        toggleValidationClasses($eventEndTime, validator.checkEventTime, endTimeErrorMessage); 

    });

    var telErrorMessage = initErrorMessage($eventTel, 'enter 10 to 15 digits or leave empty<div></div>');
    $eventTel.on('blur keyup change', function() {
    
        toggleValidationClasses($eventTel, validator.checkEventTel, telErrorMessage); 

    });

    var emailErrorMessage = initErrorMessage($eventEmail, 'enter valid email address or leave empty<br><br>');
    $eventEmail.on('blur keyup change', function() {
    
        toggleValidationClasses($eventEmail, validator.checkEventEmail, emailErrorMessage); 

    });

    var urlErrorMessage = initErrorMessage($eventUrl, 'enter valid link or leave empty<br><br>');
    $eventUrl.on('blur keyup change', function() {
    
        toggleValidationClasses($eventUrl, validator.checkEventUrl, urlErrorMessage); 

    });

    var guestsErrorMessage = initErrorMessage($timesRow, 'provide at least one guest', 'before');
    guestsErrorMessage.removeClass('hide');
    $eventGuests.on('change', function() {
        toggleValidationClassesSelectize($eventGuests, validator.checkEventGuests, guestsErrorMessage); 

    });

    var detailsErrorMessage = initErrorMessage($eventDetails, 'use less than 10000 characters');
    $eventDetails.on('blur keyup change', function() {
    
        toggleValidationClasses($eventDetails, validator.checkEventDetails, detailsErrorMessage); 

    });

    function formIsValid() {

        return  validator.checkEventName($eventName.val()) && 
                validator.checkEventType($eventType.val()) &&
                validator.checkEventHost($eventHost.val()) &&
                validator.checkEventTel($eventTel.val()) &&
                validator.checkEventEmail($eventEmail.val()) &&
                validator.checkEventUrl($eventUrl.val()) &&
                validator.checkEventGuests($eventGuests.val()) &&
                validator.checkEventLocation($eventLocation.val()) &&
                validator.checkEventDate($eventStartDate.val()) && 
                validator.checkEventTime($eventStartTime.val()) &&
                validator.checkEventDate($eventEndDate.val()) && 
                validator.checkEventTime($eventEndTime.val()) &&
                validator.checkEventDetails($eventDetails.val());

    }

});

$(document).ready(function() {

    setTimeout(function() {

        $('.selectize-control').removeClass('event-input');
        $('.selectize-dropdown').removeClass('event-input')

    }, 1000);

});

function submitEvent() {

    var $spinner = $('#spinnerdiv-white-event');
    $spinner.show();

    var $eventForm = $('#event-creation');
    $eventForm.hide();

    var formData = {};
    formData.type = 'social';
    var $elem;

    $('.event-input').each(function() {

        $elem = $(this);
        formData[$elem.attr('id')] = $elem.val();

    });

    localforage.getItem('me')

        .then(function(me) {

            formData.user = me.email;
            formData.googlelogin = me.googlelogin;
            formData.displayname = me.displayname;
            formData.timezoneOffset = (new Date()).getTimezoneOffset();
            
            $.post('/eventsocial', formData)

            .then(function() {

                $spinner.hide();

                var $successDiv = $('#success-submit');
                $successDiv.css('visibility', 'visible');
                $successDiv.show();

            })

            .catch(function(err) {
            
                $eventForm.prepend('<div class="col s12 margin-t-1"> <div class="chip red z-depth-2 white-text"> There are errors in your form. <i class="close material-icons">close</i></div></div>');
                $spinner.fadeOut();
                $eventForm.show();

            });

        });

}
