require('dotenv').config();

const googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    client = '185629692675-kl7mt54epmrdl5qa33299f7gkt75e6p4.apps.googleusercontent.com',
    redirect = ['http://localhost:3000/googleauth', 'https://genevents.herokuapp.com/googleauth'
    oauth2Client = new OAuth2Client(client, process.env.GAPIS_SEC, redirect);

const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/contacts.readonly'
];

// generate a url that asks permissions for Google+ and Google Calendar scopes 
const url = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: scopes 
});

exports.google = googleapis;
exports.client = oauth2Client;
exports.url = url;
