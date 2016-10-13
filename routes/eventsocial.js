var express = require('express'),
    app = express(),
    isEventFormValid = require('../lib/formvalidation.js').form.socialEventFormIsValid,
    eventsTable = require('../models/db.js').events;

app.get('/eventsocial', function(request, response) {

    response.render('./app/blocks/eventsocial');

});

app.post('/eventsocial', (request, response) => {

    const form = request.body;

    if (isEventFormValid(form)) {

        eventsTable.addSocialEvent(form)
        
        .then(function() {

            response.status(200);
            response.send('success'); 
        
        })
        
        .catch(function(err) {
        
            response.send(err);

        });
        
    }

});

module.exports = app;
