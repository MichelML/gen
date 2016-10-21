require('dotenv').config();

const pgpLib = require('pg-promise');
const monitor = require('pg-monitor');
const eventsActions = require('./events.js');
const userActions = require('./users.js');
 
// pg-promise initialization options:
const options = {

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
 
const pgp = pgpLib(options); // initializing pg-promise;

// instantiating the database:
const db = pgp(((process.env.NODE_ENV !== 'development') ? process.env.DATABASE_URL : "postgres://mimolap@localhost:5432/gen"));

module.exports = db;
