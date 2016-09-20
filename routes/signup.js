var express = require('express'),
    app = express();

app.get('/signup', function(request, response) {
    //if loggedin, redirect to event creation
    //else stay on page
    response.render('./app/blocks/signup');
});

module.exports = app;
