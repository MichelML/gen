'use strict';
const app = require('express')(),
      usersTable = require('../../models/db.js').users;

app.post('/user/bio', ( req, res ) => {
  console.log(req.body);
  var user = req.body; 

  usersTable.updatebio(user)

  .then(() => {

    res.status(200);
    res.send("success");

  })

  .catch(err => {

    res.status(500);
    res.send('an error occur while storing the new bio');

  });

});

module.exports = app;
