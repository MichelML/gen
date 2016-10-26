'use strict';
const express = require('express'),
    app = express(),
    isEventFormValid = require('../lib/formvalidation.js').form.socialEventFormIsValid,
    eventsTable = require('../models/db.js').events,
    convertFormDataToCalendarEvent = require('../lib/calendarevent.js').convertSocialFormDataToCalendarEvent,
    gapi = require('../lib/gapi.js'),
    nodemailer = require('../lib/nodemailer.js');

app.get('/eventsocial', function(request, response) {

    response.render('./app/blocks/eventsocial');

});

app.post('/eventsocial', (request, response) => {

    const form = request.body,
          isGoogleLogin = (form.googlelogin === "true") ? true : false;

    if (isEventFormValid(form)) {

        eventsTable.addSocialEvent(form)
        
        .then(function() {

            if (isGoogleLogin) { 
            
                let socialevent = convertFormDataToCalendarEvent(form);
                gapi.google.calendar('v3').events.insert({

                  auth: gapi.client,
                  calendarId: 'primary',
                  sendNotifications: true,
                  resource: socialevent

                }, function(err, event) {
                    
                    if (err) {
                    
                        console.log('There was an error contacting the Calendar service: ' + err);
                        response.status(500);
                        response.send(err);

                    }

                    else {
                    
                        console.log('Event created: %s', event.htmlLink);

                        var email = nodemailer.prepareEmail(form);
                        var mailOptions = nodemailer.setMailOptions(form, email);
                        nodemailer.sendMailToGuests(mailOptions);

                        response.status(200);
                        response.send('success'); 
                        
                    }
                
                });

            } 

            else {

                var email = nodemailer.prepareEmail(form);
                var mailOptions = nodemailer.setMailOptions(form, email);
                nodemailer.sendMailToGuests(mailOptions);
            
                response.status(200);
                response.send('success'); 
            
            }

        })

        .catch(function(err) {
        
            console.log('There was an error in the SQL transaction: ' + err);
            response.status(500);
            response.send(err);

        });
        
    } 

    else {
        
        console.log('There was an error in the form provided: ' + err);
        response.status(400);
        response.send(err);

    }

});

module.exports = app;
