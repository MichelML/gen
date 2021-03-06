'use strict';
require('dotenv').config();

const   googleapis = require('googleapis'),
        OAuth2Client = googleapis.auth.OAuth2,
        client = process.env.GAPIS_CLIENT,
        oauth2Client = new OAuth2Client(client, process.env.GAPIS_SEC, ((process.env.NODE_ENV !== 'development') ? process.env.REDIRECT_URI : "http://localhost:3000/googleauth"));

const scopes = [

  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/contacts.readonly'

];

// generate a url that asks permissions for Google+ and Google Calendar scopes 
const url = oauth2Client.generateAuthUrl({

  access_type: 'offline',
  scope: scopes 

});

exports.google = googleapis;
exports.client = oauth2Client;
exports.url = url;
