var express = require('express'),
    app = express(),
    EventEmitter = require('events'),
    pageRenderer = new EventEmitter();
    gapi = require('../../lib/gapi.js'),
    usersTable = require('../../models/db.js').users;

app.get('/googleauth', (req, res) => {
    gapi.client.getToken(req.query.code, (err, tokens) => {
        if (!err) {
            gapi.client.setCredentials(tokens);
            pageRenderer.emit('credentialsAreSet');
        }
    });

    pageRenderer.once('credentialsAreSet', () => {
        getUserGooglePlusProfile();
        getUserGoogleContacts(undefined, undefined, true);
    });

    pageRenderer.once('peopleAreRetrieved', () => {
        pageRenderer.removeAllListeners('peopleReady')
        res.render('./app/blocks/eventchoice');
    });

});

function getUserGooglePlusProfile() {
    // Retrieving google plus info of user
    gapi.google.plus('v1').people.get({
        userId: 'me',
        auth: gapi.client,
        params: {
            fields: ['emails', 'displayName', 'image', 'name/givenName']
        }
    }, (err, response) => {
        // handle err and response
        if (err) console.log(err);
        else {
            app.locals.me = {
                displayname: response.displayName || 'user',
                firstname: response.name.givenName,
                lastname: response.name.familyName,
                pw: '',
                googlelogin: true,
                image: (response.image && response.image.url) ? response.image.url : 'images/gen-green.png',
                imagebig: (response.image && response.image.url) ? response.image.url.replace(/\?sz=50/, '?sz=128') : 'images/gen-green.png',
                email: response.emails[0].value,
                bio: ''
            };
        }
    });
}

function getUserGoogleContacts(...pageTokenAndContactsAndShouldGetContacts) {

    var contacts = (pageTokenAndContactsAndShouldGetContacts[1]) ? pageTokenAndContactsAndShouldGetContacts[1] : [];
    var shouldGetContacts = (pageTokenAndContactsAndShouldGetContacts[2]);
    if (shouldGetContacts) {
        var optionsForPeopleApiRequest = {
            'resourceName': 'people/me',
            'pageSize': 500,
            'auth': gapi.client,
            'requestMask.includeField': 'person.names,person.email_addresses'
        };
        var pageToken = (pageTokenAndContactsAndShouldGetContacts[0]) ? pageTokenAndContactsAndShouldGetContacts[0] : '';
        if (pageToken) optionsForPeopleApiRequest.pageToken = pageToken;

        gapi.google.people('v1').people.connections.list(optionsForPeopleApiRequest, (err, response) => {
            // handle err and response
            if (err) console.log(err);
            else {
                var shouldGetContacts = (response.connections) ? response.connections.length === 500 : false;
                var pageToken = response.nextPageToken || '';
                var newContacts = (response.connections) ? response.connections.filter(contact => contact.emailAddresses)
                    .map(contact => {
                        return {
                            name: (contact.names) ? contact.names[0].displayName : '',
                            email: contact.emailAddresses[0].value
                        };
                    }) : [];
                contacts = contacts.concat(newContacts);
                getUserGoogleContacts(pageToken, contacts, shouldGetContacts);
            }
        });
    } else {
        console.log('number of contacts: ' + contacts.length);
        app.locals.me.contacts = contacts;
        usersTable.add(app.locals.me);
        pageRenderer.emit('peopleAreRetrieved');
    }
}

module.exports = app;
