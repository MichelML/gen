var express = require('express'),
    app = express(),
    EventEmitter = require('events'),
    gapi = require('../../lib/gapi.js')
    simpleGet = require('simple-get');

app.get('/googleauth', (req, res) => {
    var code = req.query.code;
    var Persons = [];
    var pageRenderer = new EventEmitter();
    gapi.client.getToken(code, (err, tokens) => {
        // Retrieving User's Google Profile
        gapi.client.setCredentials(tokens);
        gapi.google.plus('v1').people.get({
            userId: 'me',
            params: {
                fields: ['emails', 'displayName', 'image', 'name/givenName']
            },
            auth: gapi.client
        }, (err, response) => {
            // handle err and response
            if (err) console.log(err);
            else {
                app.locals.me = {
                    name: response.displayName,
                    image: (response.image && response.image.url) ? response.image.url : '',
                    email: response.emails[0].value,
                    firstName: (response.name) ? response.name.givenName : ''
                };
            }
        });

        // Retrieving google contacts of users
        simpleGet('https://people.googleapis.com/v1/people/me/connections?pageSize=500&requestMask.includeField=person.email_addresses%2Cperson.names&access_token=' + tokens.access_token, (err, res) => {
                if (err) throw err;
                var persons = '';
                res.on('data', (data) => {
                    persons += data;
                });
                res.on('end', () => {
                    persons = JSON.parse(persons);
                    Persons = (persons.connections) ? persons.connections
                        .filter(person => person.emailAddresses)
                        .map((person) => {
                            return {
                                name: (person.names) ? person.names[0].displayName : '',
                                email: person.emailAddresses[0].value
                            };
                        }) : {};
                    pageRenderer.emit('emailsReady');
                });
                res.on('error', () => {
                    console.log('There was an error. While streaming the data.')
                });
            }); 

        pageRenderer.on('emailsReady', () => {
            console.log(Persons);
            var locals = {
                persons: Persons
            };
            res.render('./app/blocks/event', locals);
        });

    });
});

module.exports = app;
