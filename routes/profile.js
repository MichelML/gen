'use strict';
var express = require('express'),
    app = express();

app.get('/me', (request, response) => {

  response.render('./app/blocks/profile');

});

module.exports = app;
