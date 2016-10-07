var express = require('express'),
    app = express();

app.get('/eventsocial', function(request, response) {
    //if a user is not logged in, redirect to authentication
    //  to be done
    //else stay on the page
    response.render('./app/blocks/eventsocial');
});

module.exports = app;
