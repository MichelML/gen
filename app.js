// Set Environment
require('dotenv').config();

// Modules
const express = require('express');
const EventEmitter = require('events');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const methodOverride = require('method-override');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const gapi = require('./lib/gapi');

// Routes
const indexView = require('./routes/index');
const signinView = require('./routes/signin');
const eventView = require('./routes/event');
const profileView = require('./routes/profile');
const eventSumView = require('./routes/eventsummary');
const signupView = require('./routes/signup');
const googleSignin = require('./routes/auth/google-signin.js');

// App settings and middlewares
const app = express();

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler());
}

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// Set Login Processes
app.use('/', googleSignin);

// Set views 
app.use('/', indexView);
app.use('/', signinView);
app.use('/', signupView);
app.use('/', eventView);
app.use('/', profileView);
app.use('/', eventSumView);

app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));
