var express = require('express'),
    app = express(),
    validate = require('../lib/validation.js')
    usersTable = require('../models/users.js'),
    bcrypt = require('bcrypt-nodejs');

app.get('/signin', function(request, response) {

    response.render('./app/blocks/signin');

});

app.post('/signin', (request, response) => {
    var locals = {};
    reqBody = request.body;
    usersTable.find(reqBody['email-account'])
        .then(user=>{

            if (user.googlelogin) {
                
                locals.error = 'Please use Google Sign-In';
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
                response.render('app/blocks/choices');

            }

        })
        .catch(error=>{

            locals.error = 'user does not exist';
            response.render('app/blocks/signin', locals);

        });
});


module.exports = app;
