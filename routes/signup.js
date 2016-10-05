var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    validate = require('../lib/validation.js'),
    usersTable = require('../models/users.js'),
    reqBody = {};


app.get('/signup', (request, response) => {
    response.render('./app/blocks/signup');
});

app.post('/signup', (request, response) => {
    var locals = {};
    reqBody = request.body;
    if (!validate.isValidEmail(reqBody['email-account'])) {
        locals.error = 'invalid email'; 
        response.render('app/blocks/signup',locals);
    } 
    else if (!validate.isValidPassword(reqBody['password-account'])) {
        locals.error = 'invalid password'; 
        response.render('app/blocks/signup',locals);
    } 
    else if (!validate.isValidPassword(reqBody['password2-account']) ||
        !validate.isValidPassword(reqBody['password-account'],reqBody['password2-account'])) {
        locals.error = 'invalid password confirmation'; 
        response.render('app/blocks/signup',locals);
    }
    else {
         var tempName = reqBody['email-account'].replace(/@.+/, '');
         app.locals.me = {
                displayname: tempName,
                firstname: tempName,
                lastname: tempName,
                pw: reqBody['password-account'],
                googlelogin: false,
                image: 'images/gen-green.png',
                imagebig: 'images/gen-green.png',
                email: reqBody['email-account'],
                contacts: [reqBody['email-account']]
            };
         usersTable.add(app.locals.me)
             .then(data=>{
                response.render('app/blocks/event');
             });
    }
});

module.exports = app;
