localforage.getItem("me")
            .then(function(me) {
                if (me) {
                    $('#spinnerdiv').fadeOut();
                }
                else { 
                    window.location.replace('/');
                }
            }).catch(function(err) {

                window.location.replace('/');

            });
