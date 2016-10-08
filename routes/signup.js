var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    validate = require('../lib/validation.js'),
    usersTable = require('../models/users.js'),
    bcrypt = require('bcrypt-nodejs'),
    reqBody = {};


app.get('/signup', (request, response) => {

    response.render('./app/blocks/signup');

});

app.post('/signup', (request, response) => {

    var locals = {};
    reqBody = request.body;

    if (!validate.isValidEmail(reqBody['email-account'])) {

        locals.error = 'invalid email';
        response.render('app/blocks/signup', locals);

    } 

    else if (!validate.isValidPassword(reqBody['password-account'])) {

        locals.error = 'invalid password';
        response.render('app/blocks/signup', locals);

    } 

    else if (!validate.isValidPassword(reqBody['password2-account']) ||

        !validate.isPasswordConfirmMatching(reqBody['password-account'], reqBody['password2-account'])) {
        locals.error = 'invalid password confirmation';
        response.render('app/blocks/signup', locals);

    } 

    else {

        var tempName = reqBody['email-account'].replace(/@.+/, '');
        app.locals.me = {
            displayname: tempName,
            firstname: tempName,
            lastname: tempName,
            image: 'img/gen-green.png',
            imagebig: 'img/gen-green.png',
            email: reqBody['email-account'],
            contacts: [reqBody['email-account']]
        };

        var pgObject = {};
        pgObject.pw = bcrypt.hashSync(reqBody["password-account"]);
        pgObject.googlelogin = false;
        Object.setPrototypeOf(pgObject, app.locals.me);

        usersTable.add(pgObject)

        .then(data => {
            response.render('app/blocks/eventchoice');
        })

        .catch(() => {
            
            locals.error = 'Oops! Something went wrong<br>Please try again!';
            response.render('app/blocks/signup', locals);

        });

    }

});

module.exports = app;
