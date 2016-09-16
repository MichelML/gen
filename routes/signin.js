var express = require('express'),
    app = express();

app.get('/signin', function(request, response) {
    //if a user is logged in already, redirect to event.pug
    //  to be done
    //else stay on the page
    response.render('signin');
});

module.exports = app;
