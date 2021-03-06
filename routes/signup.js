'use strict';
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    validate = require('../lib/validation.js'),
    usersTable = require('../models/db.js').users,
    bcrypt = require('bcrypt'),
    reqBody = {};


app.get('/signup', (request, response) => {

    response.render('./app/blocks/signup', request.app.locals.settings.gapis);

});

app.post('/signup', (request, response) => {

    var locals = {};
    var reqBody = request.body;

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

            displayname: tempName.substr(0,14),
            firstname: tempName.substr(0,14),
            lastname: tempName.substr(0,14),
            image: 'img/gen-green.png',
            imagebig: 'img/gen-green.png',
            email: reqBody['email-account'],
            contacts: JSON.stringify([ {
                name: '',
                email: reqBody['email-account'] 
            }]),
            bio: '',
            googlelogin: false

        };

        var pgObject = {};
        pgObject.pw = bcrypt.hashSync(reqBody["password-account"], 10);
        Object.setPrototypeOf(pgObject, app.locals.me);

        usersTable.add(pgObject)

        .then(() => {

            response.render('app/blocks/eventchoice');

        })

        .catch((err) => {

            if (err.detail.includes('already exists')) {

                locals.error = 'this user already exists';
                response.render('app/blocks/signup', locals);

            } 

            else {

                locals.error = 'Oops! Something went wrong. Please try again!';
                response.render('app/blocks/signup', locals);

            }

        });

    }

});

module.exports = app;
