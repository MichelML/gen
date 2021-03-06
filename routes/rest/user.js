'use strict';
const app = require('express')(),
      usersTable = require('../../models/db.js').users;

app.get('/user/:email', ( req, res )=>{

   usersTable.find(req.params.email)

      .then(user=>{

        user.pw = '';
        res.send(user);

      })

      .catch(err=>{

        var error = 'Please try again. There was a problem on our side.' 
        res.render('signin.pug', error);

      });

});

module.exports = app;
