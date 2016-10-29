'use strict';
var express = require('express'),
    app = express();

app.get('/choices', function(request, response) {

    response.render('./app/blocks/eventchoice', request.app.locals.settings.gapis);

});

module.exports = app;
