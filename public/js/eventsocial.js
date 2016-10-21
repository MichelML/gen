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
        $eventStartDate = $('#startdate-event'),
        $eventStartTime = $('#starttime-event'),
        $eventEndDate = $('#enddate-event'),
        $eventEndTime = $('#endtime-event'),
        $eventLocation = $('#place-event'),
        $eventDetails = $('#details-event'),
        $createEvent = $('#event-button');

    $('#event-creation').on('keyup', function() {

        if (formIsValid()) {

           $createEvent.prop('disabled', false);

        }

        else {
            
           $createEvent.prop('disabled', true);

        }

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

    var validator = {

        checkEventName: function(eventName) {

            return /^[a-zA-Z0-9\-\s]{1,200}$/.test(eventName);

        },

        checkEventType: function(eventType) {

            return /^[a-zA-Z\-\s]{1,200}$/.test(eventType) || !eventType;

        },

        checkEventHost: function(eventHost) {

            return /^[a-zA-Z\-\s]{1,200}$/.test(eventHost);

        },

        checkEventTel: function(eventTel) {

            return /^[0-9]{10,15}$/.test(eventTel) || !eventTel;

        },

        checkEventEmail: function(eventEmail) {

            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(eventEmail) || !eventEmail;

        },

        checkEventUrl: function(eventUrl) {

            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(eventUrl) || !eventUrl;

        },

        checkEventGuests: function(eventGuests) {
        
            return eventGuests;

        },
        
        checkEventLocation: function(eventLocation) {
        
            return /^.{1,1000}$/.test(eventLocation);

        },

        checkEventDate: function(eventDate) {

            return eventDate;

        },

        checkEventTime: function(eventTime) {

            return eventTime;

        },

        checkEventDetails: function(eventDetails) {

            return /^.{0,10000}/.test(eventDetails) || !eventDetails;

        }

    };

});

$(document).ready(function() {

    setTimeout(function() {

        $('.selectize-control').removeClass('event-input');
        $('.selectize-dropdown').removeClass('event-input')

    }, 1000);

});

function submitEvent() {

    var $spinner = $('#spinnerdiv-white-event');
    $spinner.css('visibility', 'visible');
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
                $spinner.css('visibility', 'hidden');

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
