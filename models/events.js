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
function eventsActions(obj) {
    return {
        addPersonalEvent: function (form) {
            return obj.one('INSERT INTO events VALUES(DEFAULT,$1,current_date,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING eventname', 
                    [form['user'],
                    form['type'], 
                    form['name-event'], 
                    form['type-event'], 
                    form['guests-event'], 
                    // a personal event does not have a host and guests information
                    // those entries are therefore empty
                    '', '', '', '', '', 
                    form['place-event'], 
                    form['startdate-event'], 
                    form['starttime-event'], 
                    form['enddate-event'], 
                    form['endtime-event'], 
                    form['details-event']]
                    );
        },

        addSocialEvent: function (form) {
            return obj.one('INSERT INTO events VALUES(DEFAULT,$1,current_date,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)', 
                    [form['user'],
                    form['type'], 
                    form['name-event'], 
                    form['type-event'], 
                    form['guests-event'], 
                    // a personal event does not have a host and guests information
                    // those entries are therefore empty
                    form['host-event'], 
                    form['tel-event'], 
                    form['mail-event'], 
                    form['link-event'], 
                    form['guests-event'], 
                    form['place-event'], 
                    form['startdate-event'], 
                    form['starttime-event'], 
                    form['enddate-event'], 
                    form['endtime-event'], 
                    form['details-event']]
                    );
        },

        findAll: function (email) {
            return obj.one("SELECT eventname,eventstartdate,eventstarttime FROM events WHERE createdby = $1", email);
        },

        find: function (id) {
            return obj.one("SELECT * FROM events WHERE SERIAL = $1", id);
        },

        delete: function (id) {
            return obj.result("DELETE FROM events WHERE id=$1", id);
        }
    };
}

module.exports = db.events;
