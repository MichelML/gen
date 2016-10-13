const app = require('express')(),
      eventsTable = require('../../models/db.js').events;

app.post('/events/:email', ( req, res ) => {

   eventsTable.findAll(req.params.email)

      .then(events=>{

            res.send(events);

      })

      .catch(err=>{

            res.send(err);

      });

});

module.exports = app;
