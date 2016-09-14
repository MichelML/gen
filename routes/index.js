var express = require('express'),
    app = express(),
    gapi = require('../lib/gapi.js');

app.get('/', function(request, response) {
  //if logged in, redirect to event creation
  //else, stay on landing
  var locals = {
    url:gapi.url
  }
  response.render('landingpage', locals);
});

module.exports = app;
