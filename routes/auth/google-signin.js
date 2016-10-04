var express = require('express'),
    app = express(),
    EventEmitter = require('events'),
    gapi = require('../../lib/gapi.js'),
    usersTable = require('../../models/users');

app.get('/googleauth', (req, res) => {
    var pageRenderer = new EventEmitter();
    var user = {};
    gapi.client.getToken(req.query.code, (err, tokens) => {
      if (!err) {
        gapi.client.setCredentials(tokens);
        pageRenderer.emit('credentialsAreSet');
      }
    });

    pageRenderer.once('credentialsAreSet', () => {

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
                    pw:'',
                    googlelogin:true,
                    image: (response.image && response.image.url) ? response.image.url : 'images/gen-green.png',
                    imagebig: (response.image && response.image.url) ? response.image.url.replace(/\?sz=50/,'?sz=128') : 'images/gen-green.png',
                    email: response.emails[0].value,
                };
                usersTable.add(app.locals.me);
            }
        });

        // Retrieving Google Contacts of User
        gapi.google.people('v1').people.connections.list({
            'resourceName': 'people/me',
            'pageSize': 200,
            'auth': gapi.client,
            'requestMask.includeField': 'person.names,person.email_addresses'
        }, (err, response) => {
            // handle err and response
            if (err) console.log(err);
            var people = response.connections || '';
            people = (people) ? people.filter(person => person.emailAddresses)
                .map(person => {
                    return {
                        name: (person.names) ? person.names[0].displayName : '',
                        email: person.emailAddresses[0].value
                    };
                }) : {};
            app.locals.persons = people;
            pageRenderer.emit('peopleAreRetrieved');
        });

    });

    pageRenderer.once('peopleAreRetrieved', () => {
        pageRenderer.removeAllListeners('peopleReady')
        res.render('./app/blocks/event');
    });

});

module.exports = app;
