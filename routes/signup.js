var express = require('express'),
    app = express();

app.get('/signup', function(request, response) {
    response.render('./app/blocks/signup');
});

module.exports = app;
