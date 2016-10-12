var express = require('express'),
    app = express();

app.get('/summaryp', function(request, response) {
  response.render('./app/blocks/eventsummarypersonal');
});

module.exports = app;
