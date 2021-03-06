'use strict';
// Users repository
function userActions(obj) {

    return {

        // Add a new user record, given name + active values, and return the new id
        add: (user) => {

            return obj.none('INSERT INTO users VALUES($1,$2,$3,$4,$5,$6,current_date,$7,$8,$9,$10)', 
                    [user.firstname,
                    user.lastname,
                    user.displayname,
                    user.email,
                    user.pw,
                    user.googlelogin,
                    user.image,
                    user.imagebig,
                    user.contacts,
                    user.bio]);

        },

        find: (email) => {

            return obj.one("SELECT firstname,lastname,displayname,email,image,imagebig,contacts,googlelogin,bio,pw from users WHERE email = $1", email);

        },

        // Delete users by name and return the number of users deleted
        delete: (email) => {

            return obj.result("DELETE FROM users WHERE email=$1", email);

        },

        updatebio: (user) => {
        
            return obj.none("UPDATE users SET bio=$1 WHERE email=$2", [user.bio,user.email]);

        }

    }

}

module.exports = userActions;
