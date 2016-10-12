var express = require('express'),
    app = express();

app.get('/eventpersonal', (request, response) => {
    response.render('./app/blocks/eventpersonal');
});

app.post('/eventpersonal', (request, response) => {
    var reqBody = request.body;
   console.log(reqBody); 
});

module.exports = app;


function formIsValid() {

    return  validator.checkEventName($eventName.val()) && 
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
