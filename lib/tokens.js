'use strict';
require('dotenv').config();

const fs = require('fs');

function getPathToTokens(email) {

    return process.cwd() + '/' + process.env.TOKEN_DIR + '/' + email;

}

function storeToken(token,email) {

  fs.writeFileSync(getPathToTokens(email), JSON.stringify(token));
  console.log('Token stored to ' + process.env.TOKEN_DIR + '/' + email);

}

function getToken(email) {
    
    return JSON.parse(fs.readFileSync(getPathToTokens(email), 'utf8'));

}

exports.storeToken = storeToken;
exports.getToken = getToken;
