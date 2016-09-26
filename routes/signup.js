var express = require('express'),
    app = express(),
    validate = require('../lib/validation.js');

app.get('/signup', function(request, response) {
    response.render('./app/blocks/signup');
});

app.post('/signup', function(request, response) {

});

module.exports = app;
