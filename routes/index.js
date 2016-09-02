var express = require('express'),
    app = express();

app.get('/', function(request, response) {
  //if logged in, redirect to event creation
  //else, stay on landing
  response.render('landingpage');
});

module.exports = app;
