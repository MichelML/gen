localforage.getItem("me")

    .then(function(me) {

        ko.applyBindings(me);

        // strategy to initiate contact lists in guests input
        // see selectize.js for the rest of initiation strategy
        var $contactsList = $('#contacts');
        if ($contactsList[0]) {

            $contactsList.click();

        }

    })

    .catch(function(err) {

        console.log(err);

    });
