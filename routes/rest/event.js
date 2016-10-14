const app = require('express')(),
      eventsTable = require('../../models/db.js').events;

app.post('/events/:email', ( req, res ) => {

   eventsTable.findAll(req.params.email)

      .then(events=>{

            res.send(events);

      })

      .catch(err=>{

            res.status(500);
            //The error message will show in the 'responseText' property
            //on the response object on the client side
            res.send(err.message);

      });

});

module.exports = app;
