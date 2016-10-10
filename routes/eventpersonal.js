var express = require('express'),
    app = express();

app.get('/eventpersonal', function(request, response) {
    response.render('./app/blocks/eventpersonal');
});

module.exports = app;
