localforage.getItem("me")
            .then(function(me) {
                if (me) {
                    window.location.replace('/choices');
                }
                else { 
                    $('#spinnerdiv').fadeOut();
                }
            })
            .catch(function(err) {
                window.location.replace('/choices');
            });
