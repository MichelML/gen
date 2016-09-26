var express = require('express'),
    app = express();

app.get('/signup', function(request, response) {
    response.render('./app/blocks/signup');
});

app.post('/signup', function(request, response) {

});

module.exports = app;


function isValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value);
}

function isValidPassword(pw) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pw.value);
}

function isPasswordConfirmMatching(pw1, pw2) {
    return pw1.value === pw2.value;
}
