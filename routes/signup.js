var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    validate = require('../lib/validation.js'),
    reqBody = {};


app.get('/signup', (request, response) => {
    response.render('./app/blocks/signup');
});

app.post('/signup', (request, response) => {
    reqBody = request.body;
    if (!validate.isValidEmail(reqBody['email-account']) || 
        !validate.isValidPassword(reqBody['password-account']) ||
        !validate.isValidPassword(reqBody['password2-account']) ||
        !validate.isValidPassword(reqBody['password-account'],reqBody['password2-account'])) {
        response.render('app/blocks/signup');
    }
    else {
        response.render('app/blocks/event');
    }
});

module.exports = app;
