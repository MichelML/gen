var express = require('express'),
    app = express();

app.get('/me', function(request, response) {
//if a user is not loggedin, redirect to auth page
//else stay on the page
  response.render('profile');
});

module.exports = app;
