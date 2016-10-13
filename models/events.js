'use strict';
var pgpLib = require('pg-promise');
var monitor = require('pg-monitor');
 
// pg-promise initialization options:
var options = {
    capTX: true, // capitalize transaction commands;
    extend: function () {
        // our 'events' repository extension:
        this.events = eventsActions(this);
    }
};
 
monitor.attach(options); // attaching to all events;
monitor.setTheme('matrix'); // changing default theme;
 
var pgp = pgpLib(options); // initializing pg-promise;
 
// instantiating the database:
var db = pgp("postgres://mimolap@localhost:5432/gen");

// Events repository
function userActions(obj) {
    return {
        addPersonalEvent: function (form) {
            return obj.one('INSERT INTO events VALUES(DEFAULT,$1,current_date,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING eventname', [form['type'], form['']])
                .then(eventform=> {
                    return JSON.parse(data.contacts);
                });
        },
        // Get number of active users
        count: function () {
            return obj.one("SELECT count(*) FROM users")
                .then(data=> {
                    return data.count;
                });
        },
        find: function (email) {
            return obj.one("SELECT firstname,lastname,displayname,email,image,imagebig,contacts from users WHERE email = $1", email)
                .then(data=> {
                    return data
                });
        },
        // Delete users by name and return the number of users deleted
        delete: function (email) {
            return obj.result("DELETE FROM users WHERE email=$1", email)
                .then(result=> {
                    return result.rowCount;
                });
        }
    }
}

module.exports = db.users;
