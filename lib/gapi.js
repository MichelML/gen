require('dotenv').config();
const googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    client = '185629692675-jsqjmmqp6c11unoa18vf0ck8ibncdm99.apps.googleusercontent.com',
    redirect = 'http://localhost:3000/event',
    oauth2Client = new OAuth2Client(client, process.env.GAPIS_SEC, redirect);

// generate a url that asks permissions for Google+ and Google Calendar scopes 
const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/contacts.readonly'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token) 
  scope: scopes // If you only need one scope you can pass it as string 
});

exports.google = googleapis;
exports.client = oauth2Client;
exports.url = url;
