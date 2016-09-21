localforage.getItem("me")
    .then(function(me) {
        ko.applyBindings(me);
    }).catch(function(err) {
        console.log(err);
    });
