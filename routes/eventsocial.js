var express = require('express'),
    app = express(),
    isEventFormValid = require('../lib/formvalidation.js').form.socialEventFormIsValid,
    eventsTable = require('../models/db.js').events;

app.get('/eventsocial', function(request, response) {

    response.render('./app/blocks/eventsocial');

});

module.exports = app;
