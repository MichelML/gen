var express = require('express'),
    app = express();

app.get('/eventpersonal', (request, response) => {
    response.render('./app/blocks/eventpersonal');
});

app.post('/eventpersonal', (request, response) => {

});

module.exports = app;
