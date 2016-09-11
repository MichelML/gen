var express = require('express');
var app = express();
var morgan = require('morgan');
var indexView = require('./routes/index');
var signinView = require('./routes/signin');
var eventView = require('./routes/event');
var profileView = require('./routes/profile');
var eventSumView = require('./routes/eventsummary');
var signupView = require('./routes/signup');

app.set('port', (process.env.PORT || 5000));

app.use(morgan('combined'));

app.use(express.static(__dirname + '/public'));

// views is the directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use('/', indexView);
app.use('/', signinView);
app.use('/', signupView);
app.use('/', eventView);
app.use('/', profileView);
app.use('/', eventSumView);

app.listen(app.get('port'),() => console.log('Node app is running on port', app.get('port')););
