'use strict';
var express = require('express'),
    app = express(),
    validate = require('../lib/validation.js'),
    usersTable = require('../models/db.js').users,
    bcrypt = require('bcrypt');

app.get('/signin', function(request, response) {

    response.render('./app/blocks/signin', request.app.locals.settings.gapi);

});

app.post('/signin', (request, response) => {

    var locals = {};
    var reqBody = request.body;
    var email = reqBody['email-account'];

    usersTable.find(email)

        .then(user=>{

            console.log(user);
            if (user.googlelogin === 'true') {
                
                locals.error = 'This user should use Google Sign-In';
                response.render('app/blocks/signin', locals);

            }

            else if (!validate.isValidEmail(reqBody['email-account']) || 
                    !validate.isValidPassword(reqBody['password-account']) || 
                    !bcrypt.compareSync(reqBody['password-account'], user.pw)) {

                locals.error = 'wrong email or password';
                response.render('app/blocks/signin', locals);

            }

            else {

                app.locals.me = user;
                response.render('app/blocks/eventchoice');

            }

        })

        .catch(error=>{

            console.log(error);
            locals.error = 'user does not exist';
            response.render('app/blocks/signin', locals);

        });

});

module.exports = app;
