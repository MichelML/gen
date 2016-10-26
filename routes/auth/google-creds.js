'use strict';
const   express = require('express'),
        app = express(),
        gapi = require('../../lib/gapi.js'),
        usersTable = require('../../models/db.js').users,
        tokenlib = require('../../lib/tokens.js');

app.post('/setcreds', (req, res) => {

    const email = req.body.email;
    const tokens = tokenlib.getToken(email); 
    
    gapi.client.setCredentials(tokens);

    if (Date.now() >= tokens.expiry_date) {
    
        gapi.client.refreshAccessToken(function(err, tokens) {
        
            if (err) {
                
                console.log('Error while refreshing tokens: ' + err);
                return;
            
            }

            tokenlib.storeToken(tokens, email);
            
        });
    
    }

});

module.exports = app;
