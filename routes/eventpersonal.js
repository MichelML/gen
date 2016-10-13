const express = require('express'),
    app = express(),
    isEventFormValid = require('../lib/formvalidation.js').form.personalEventFormIsValid,
    pg = require('pg-promise');

app.get('/eventpersonal', (request, response) => {

    response.render('./app/blocks/eventpersonal');

});

app.post('/eventpersonal', (request, response) => {

    const form = request.body;

    if (isEventFormValid(form)) {


        
    }

    response.send('success'); 

});

module.exports = app;
