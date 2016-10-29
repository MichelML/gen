$(document).ready(function(event) {

    var $eventName = $('#name-event'),
        $eventType = $('#type-event'),
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

        } else {

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

    var detailsErrorMessage = initErrorMessage($eventDetails, 'use less than 10000 characters');
    $eventDetails.on('blur keyup change', function() {
    
        toggleValidationClasses($eventDetails, validator.checkEventDetails, detailsErrorMessage); 

    });

    function formIsValid() {

        return validator.checkEventName($eventName.val()) &&
            validator.checkEventType($eventType.val()) &&
            validator.checkEventLocation($eventLocation.val()) &&
            validator.checkEventDate($eventStartDate.val()) &&
            validator.checkEventTime($eventStartTime.val()) &&
            validator.checkEventDate($eventEndDate.val()) &&
            validator.checkEventTime($eventEndTime.val()) &&
            validator.checkEventDetails($eventDetails.val());

    }

});

function submitEvent() {

    var $spinner = $('#spinnerdiv-white-event');
    $spinner.show();

    var $eventForm = $('#event-creation');
    $eventForm.hide();

    var formData = {};
    formData.type = 'personal';
    var $elem;

    $('.event-input').each(function() {
        $elem = $(this);
        formData[$elem.attr('id')] = $elem.val();
    });

    localforage.getItem('me')

        .then(function(me) {
            
            formData.user = me.email;
            formData.googlelogin = me.googlelogin;
            formData.timezoneOffset = (new Date()).getTimezoneOffset();
            
            $.post('/eventpersonal', formData)

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
