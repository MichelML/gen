localforage.getItem("me")

    .then(function(me) {

        ko.applyBindings(me);

        // Strategy to initiate contact lists in guests input. 
        // See self-made selectize.js in public/js
        // for the rest of the contacts initiation strategy
        var $contactsList = $('#contacts');
        if ($contactsList[0]) {

            $contactsList.click();

        }

    })

    .catch(function(err) {

        console.log(err);

    });
