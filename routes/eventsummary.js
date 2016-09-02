var express = require('express'),
    app = express();

app.get('/summary', function(request, response) {
//if a user is not loggedin, redirect to auth page
// else if a user has not completed an event, redirect to event creation
//else stay on the page
  response.render('eventsummary');
});

module.exports = app;
