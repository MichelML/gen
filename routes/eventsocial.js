const express = require('express'),
    app = express(),
    isEventFormValid = require('../lib/formvalidation.js').form.socialEventFormIsValid,
    eventsTable = require('../models/db.js').events,
    convertSocialFormDataToCalendarEvent = require('../lib/calendarevent.js').convertSocialFormDataToCalendarEvent;

app.get('/eventsocial', function(request, response) {

    response.render('./app/blocks/eventsocial');

});

app.post('/eventsocial', (request, response) => {

    const form = request.body,
          isGoogleLogin = form.googlelogin;

    if (isEventFormValid(form)) {

        eventsTable.addSocialEvent(form)
        
        .then(function() {

            
            if (isGoogleLogin) { 
            
                //build the event object to send to calendar api
                //return the event object
                 
            } 

            else {
            
                response.status(200);
                response.send('success'); 
            
            }

        })

        .then(event => {
             
            //send event to google calendar api
            
        })
        
        .catch(function(err) {
        
            response.send(err);

        });
        
    } 

    else {

        var err = new Error(); 
        response.status(500);
        response.send(err);

    }

});

module.exports = app;



var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'}
  ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10}
      ]
    }
};
