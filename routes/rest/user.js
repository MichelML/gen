const app = require('express')(),
      usersTable = require('../../models/users.js');

app.get('/user/:email', ( req, res )=>{
   console.log(req.params.email);
   usersTable.find(req.params.email)

      .then(data=>{

        res.send(data);

      })

      .catch(err=>{

        var error = 'Please try again. There was a problem on our side.' 
        res.render('signin.pug', error);

      });

});

module.exports = app;
