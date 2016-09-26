var express = require('express'),
    app = express(),
    gapi = require('../lib/gapi.js');

app.get('/', function(request, response) {
  var locals = {
    url:gapi.url
  }
  response.render('./landing/landingpage', locals);
});

module.exports = app;
