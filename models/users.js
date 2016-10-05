'use strict';
var pgpLib = require('pg-promise');
var monitor = require('pg-monitor');
 
// pg-promise initialization options:
var options = {
    capTX: true, // capitalize transaction commands;
    extend: function () {
        // our 'users' repository extension:
        this.users = userActions(this);
    }
};
 
monitor.attach(options); // attaching to all events;
monitor.setTheme('matrix'); // changing default theme;
 
var pgp = pgpLib(options); // initializing pg-promise;
 
// instantiating the database:
var db = pgp("postgres://mimolap@localhost:5432/gen");

// Users repository
function userActions(obj) {
    return {
        // Add a new user record, given name + active values, and return the new id
        add: function (user) {
            return obj.one('INSERT INTO users VALUES($1,$2,$3,$4,$5,$6,current_date,$7,$8,$9) RETURNING contacts', [user.firstname,user.lastname,user.displayname,user.email,user.pw,user.googlelogin,user.image,user.imagebig,JSON.stringify(user.contacts)])
                .then(data=> {
                    console.log(JSON.parse(data.contacts));
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
        // Find id-s of all users that have a given name
        find: function (name) {
            return obj.any("SELECT email from users WHERE name = $1", name)
                .then(data=> {
                    return data.map(m=> {
                        return m.email;
                    });
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
