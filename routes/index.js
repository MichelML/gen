'use strict';
var express = require('express'),
    app = express(),
    gapi = require('../lib/gapi.js');

app.get('/', function(request, response) {

  request.app.locals.settings.gapis.url = gapi.url;
  response.render('./landing/landingpage', request.app.locals.settings.gapis);

});

module.exports = app;
