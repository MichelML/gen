var express = require('express'),
    app = express();

app.get('/choices', function(request, response) {
    response.render('./app/blocks/eventchoice');
});

module.exports = app;
