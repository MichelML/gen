(function() {

    var $bio = $('#personal-bio textarea'),
        originalBio;

    $bio.on('focusin', function() {

        originalBio = $bio.val() || '';

    });

    $bio.on('focusout', function () {

        localforage.getItem('me')
        
        .then(function(me) {

            me.bio = $bio.val() || '';

            localforage.setItem('me', me)

            .then(function(me) {
            
                $.post('/user/bio', {bio: me.bio, email:me.email})

                .then(function(me) {
                
                      Materialize.toast('Bio successfully updated', 2000);          

                })

                .catch(function(err) {

                    showErrorToastAndResetBioValue();
                
                });
            
            })

            .catch(function(err) {

                showErrorToastAndResetBioValue();

            });
        
        })

        .catch(function(err) {
            
            showErrorToastAndResetBioValue();

        });

    });

    function showErrorToastAndResetBioValue() {
    
            Materialize.toast('Error occured', 2000);          
            $bio.val(originalBio);

    }

})();
