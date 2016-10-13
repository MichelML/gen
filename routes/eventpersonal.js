var express = require('express'),
    app = express(),
    validator = require('../lib/formvalidation.js');

app.get('/eventpersonal', (request, response) => {

    response.render('./app/blocks/eventpersonal');

});

app.post('/eventpersonal', (request, response) => {

    var reqBody = request.body;
    response.send('success'); 

});

module.exports = app;
