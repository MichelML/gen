var express = require('express'),
    app = express();

app.get('/me', function(request, response) {

  response.render('./app/blocks/profile');

});

module.exports = app;
