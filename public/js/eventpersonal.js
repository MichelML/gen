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

    $('#event-creation').on('keyup', function() {

        if (formIsValid()) {

            $createEvent.prop('disabled', false);

        } else {

            $createEvent.prop('disabled', true);

        }

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

    var validator = {

        checkEventName: function(eventName) {

            return /^[a-zA-Z0-9\-]{1,200}$/.test(eventName);

        },

        checkEventType: function(eventType) {

            return /^[a-zA-Z\-]{1,200}$/.test(eventType) || !eventType;

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

function submitForm() {

    var formData = {};
    var $elem;

    $('.event-input').each(function() {
        $elem = $(this);
        formData[$elem.attr('id')] = $elem.val();
    });

    localforage.setItem('event', formData)

    .then(function(event) {

        console.log(event);
        window.location.replace('/summary');

    })

    .catch(function(err) {

        $('form').append('<div class="col s12 margin-t-1 white-text"> <div class="chip red z-depth-2"> Please review your answers. <i class="close material-icons">close</i></div></div>')
        console.log(err);

    });

}