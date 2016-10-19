const express = require('express'),
    app = express(),
    isEventFormValid = require('../lib/formvalidation.js').form.socialEventFormIsValid,
    eventsTable = require('../models/db.js').events,
    convertFormDataToCalendarEvent = require('../lib/calendarevent.js').convertSocialFormDataToCalendarEvent,
    gapi = require('../lib/gapi.js');

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
            
                let socialevent = convertFormDataToCalendarEvent(form);
                gapi.client.calendar.events.insert({

                  auth: gapi.client,
                  calendarId: 'primary',
                  resource: socialevent

                }, function(err, theevent) {
                    
                    if (err) {
                    
                        console.log(err);
                        response.send(err);

                    }

                    else {
                    
                        console.log(theevent);
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

    else {

        var err = new Error(); 
        response.status(500);
        response.send(err);

    }

});

module.exports = app;
