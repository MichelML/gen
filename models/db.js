'use strict';
var pgpLib = require('pg-promise');
var monitor = require('pg-monitor');
var eventsActions = require('./events.js');
var userActions = require('./users.js');
 
// pg-promise initialization options:
var options = {

    capTX: true, // capitalize transaction commands;

    extend: function () {

        // our 'events' repository extension:
        this.events = eventsActions(this);

        // our 'users' repository extension:
        this.users = userActions(this);

    }

};
 
monitor.attach(options); // attaching to all events;
monitor.setTheme('matrix'); // changing default theme;
 
var pgp = pgpLib(options); // initializing pg-promise;

// instantiating the database:
var db = pgp(process.env.DATABASE_URL || "postgres://mimolap@localhost:5432/gen");

module.exports = db;
