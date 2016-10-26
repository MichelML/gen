'use strict';
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
const helmet = require('helmet');
const gapi = require('./lib/gapi');

// Routes
const indexView = require('./routes/index');
const signinView = require('./routes/signin');
const eventChoiceView = require('./routes/eventchoice');
const eventView = require('./routes/eventsocial');
const personalEventView = require('./routes/eventpersonal');
const profileView = require('./routes/profile');
const signupView = require('./routes/signup');
const googleSignin = require('./routes/auth/google-signin.js');
const googleCredentials = require('./routes/auth/google-creds.js');
const userData = require('./routes/rest/user.js');
const eventsData = require('./routes/rest/event.js');
const saveBio = require('./routes/rest/bio.js');

// App settings and middlewares
const app = express();

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler());
}

app.set('port', (process.env.PORT || 5000));
app.set('views', process.cwd() + '/views');
console.log(app.get('views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// Set Login Processes
app.use('/', googleSignin);
app.use('/', googleCredentials);

// Set routes 
app.use('/', indexView);
app.use('/', signinView);
app.use('/', signupView);
app.use('/', eventChoiceView);
app.use('/', eventView);
app.use('/', personalEventView);
app.use('/', profileView);
app.use('/', userData);
app.use('/', eventsData);
app.use('/', saveBio);

app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));


