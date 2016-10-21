'use strict';
const   express = require('express'),
        app = express(),
        EventEmitter = require('events'),
        pageRenderer = new EventEmitter(),
        gapi = require('../../lib/gapi.js'),
        usersTable = require('../../models/db.js').users;

app.get('/googleauth', (req, res) => {
    
    let methodCompletedCount = 0;
    let user = {};

    gapi.client.getToken(req.query.code, (err, tokens) => {

        if (!err) {

            gapi.client.setCredentials(tokens);
            pageRenderer.emit('credentialsAreSet');

        }

    });

    pageRenderer.on('credentialsAreSet', () => {

        getUserGooglePlusProfile(user);
        getUserGoogleContacts(user, '', '', true);

    });

    pageRenderer.on('methodCompleted', () => {

        methodCompletedCount += 1;

        if (methodCompletedCount === 2) {

            usersTable.add(user);
            app.locals.me = { email: user.email };
            res.render('./app/blocks/eventchoice');
        
        }

    });

});

function getUserGooglePlusProfile(user, tokenz) {
    // Retrieving google plus info of user
    gapi.google.plus('v1').people.get({

        userId: 'me',
        auth: gapi.client,
        params: {

            fields: ['emails', 'displayName', 'image', 'name/givenName']

        }

    }, (err, response) => {

        if (err) {
            
            console.log(err);
            throw err;
        
        }

        else {

            console.log(response);
            user.displayname = response.displayName || 'user';
            user.firstname = response.name.givenName;
            user.lastname = response.name.familyName;
            user.pw = '';
            user.googlelogin = true;
            user.image = (response.image && response.image.url) ? response.image.url : 'images/gen-green.png';
            user.imagebig = (response.image && response.image.url) ? response.image.url.replace(/\?sz=50/, '?sz=128') : 'images/gen-green.png';
            user.email = response.emails[0].value;
            user.bio = '';

            pageRenderer.emit('methodCompleted');

        }

    });

}

function getUserGoogleContacts(user, pagetoken, currentcontacts, shouldgetcontacts) {

    let contacts = (currentcontacts) ? currentcontacts : [];
    let shouldGetContacts = shouldgetcontacts;

    if (shouldGetContacts) {

        let optionsForPeopleApiRequest = {

            'resourceName': 'people/me',
            'pageSize': 500,
            'auth': gapi.client,
            'requestMask.includeField': 'person.names,person.email_addresses'

        };

        let pageToken = (pagetoken) ? pagetoken : '';

        if (pageToken) {
            
            optionsForPeopleApiRequest.pageToken = pageToken;
        
        }

        gapi.google.people('v1').people.connections.list(optionsForPeopleApiRequest, (err, response) => {

            // handle err and response
            if (err) {
                
                console.log(err);
            
            }

            else {

                let shouldGetContacts = (response.connections) ? response.connections.length === 500 : false;
                let pageToken = response.nextPageToken || '';
                let newContacts = (response.connections) ? response.connections.filter(contact => contact.emailAddresses)
                    .map(contact => {
                        return {
                            name: (contact.names) ? contact.names[0].displayName : '',
                            email: contact.emailAddresses[0].value
                        };
                    }) : [];
                contacts = contacts.concat(newContacts);
                getUserGoogleContacts(user, pageToken, contacts, shouldGetContacts);

            }

        });

    } 
    
    else {

        user.contacts = JSON.stringify(contacts);
        pageRenderer.emit('methodCompleted');

    }

}

module.exports = app;
