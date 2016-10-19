const   express = require('express'),
        app = express(),
        isEventFormValid = require('../lib/formvalidation.js').form.personalEventFormIsValid,
        eventsTable = require('../models/db.js').events,
        convertFormDataToCalendarEvent = require('../lib/calendarevent.js').convertPersonalFormDataToCalendarEvent,
        gapi = require('../lib/gapi.js');

app.get('/eventpersonal', (request, response) => {

    response.render('./app/blocks/eventpersonal');

});

app.post('/eventpersonal', (request, response) => {

    const form = request.body;
          isGoogleLogin = form.googlelogin;

    if (isEventFormValid(form)) {

        eventsTable.addPersonalEvent(form)
        
        .then(function() {

            if (isGoogleLogin) { 
            
                let personalevent = convertFormDataToCalendarEvent(form);

                gapi.google.calendar('v3').events.insert({

                  auth: gapi.client,
                  calendarId: 'primary',
                  resource: personalevent

                }, function(err, event) {
                        
                        if (err) {
                        
                            console.log('There was an error contacting the Calendar service: ' + err);
                            response.send(err);

                        }

                        else {
                        
                            console.log('Event created: %s', event.htmlLink);
                            response.status(200);
                            response.send('success'); 
                            
                        }
                    
                  }); 

            }

            else {
            
                response.status(200);
                response.send('success'); 
            
            }
        
        })
        
        .catch(function(err) {
        
            response.send(err);

        });
        
    }

});

module.exports = app;
