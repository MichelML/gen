const app = require('express')(),
      usersTable = require('../../models/users.js');

app.get('/user/:email', ( req, res )=>{
   console.log(req.params.email);
   usersTable.find(req.params.email)

      .then(data=>{

        res.send(data);

      })

      .catch(err=>{
        
        res.send(err);

      });

});

module.exports = app;
