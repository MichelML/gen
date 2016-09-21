var express = require('express'),
    app = express(),
    EventEmitter = require('events'),
    gapi = require('../../lib/gapi.js');

app.get('/googleauth', (req, res) => {
    var pageRenderer = new EventEmitter();
    gapi.client.getToken(req.query.code, (err, tokens) => {
      if (!err) {
        gapi.client.setCredentials(tokens);
        pageRenderer.emit('credentialsSet');
      }
    });

    pageRenderer.once('credentialsSet', () => {

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
                    name: response.displayName || '',
                    image: (response.image && response.image.url) ? response.image.url : '',
                    email: response.emails[0].value,
                    firstName: (response.name) ? response.name.givenName : ''
                };
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
            pageRenderer.emit('peopleReady');
        });

    });

    pageRenderer.once('peopleReady', () => {
        pageRenderer.removeAllListeners('peopleReady')
        res.render('./app/blocks/event');
    });

});

module.exports = app;
