// Users repository
function userActions(obj) {
    return {
        // Add a new user record, given name + active values, and return the new id
        add: function (user) {
            return obj.one('INSERT INTO users VALUES($1,$2,$3,$4,$5,$6,current_date,$7,$8,$9) RETURNING contacts', [user.firstname,user.lastname,user.displayname,user.email,user.pw,user.googlelogin,user.image,user.imagebig,JSON.stringify(user.contacts)])
                .then(data=> {
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
            return obj.one("SELECT firstname,lastname,displayname,email,image,imagebig,contacts,googlelogin,bio from users WHERE email = $1", email)
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

module.exports = userActions;
