const express = require('express'),
    app = express(),
    isEventFormValid = require('../lib/formvalidation.js').form.personalEventFormIsValid,
    eventsTable = require('../models/db.js').events;

app.get('/eventpersonal', (request, response) => {

    response.render('./app/blocks/eventpersonal');

});

app.post('/eventpersonal', (request, response) => {

    const form = request.body;

    if (isEventFormValid(form)) {

        eventsTable.addPersonalEvent(form)
        
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
