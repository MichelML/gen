(function() {

    var $bio = $('#personal-bio textarea'),
        originalBio,
        newBio;

    $bio.on('focusin', function() {

        originalBio = $bio.val() || '';

    });

    $bio.on('focusout', function () {

        newBio = $bio.val();

        if (bioHasChanged(newBio, originalBio)) {

            localforage.getItem('me')
            
            .then(function(me) {

                me.bio = $bio.val() || '';

                localforage.setItem('me', me)

                .then(function(me) {
                
                    updateBioInDataBase(me);

                })

                .catch(function(err) {

                    showErrorToastAndResetBioValue();

                });
            
            })

            .catch(function(err) {
                
                showErrorToastAndResetBioValue();

            });

        }

    });

    function showErrorToastAndResetBioValue() {
    
            Materialize.toast('Error occured', 2000);          
            $bio.val(originalBio);

    }

    function updateBioInDataBase(user) {

            $.post('/user/bio', {bio: user.bio, email:user.email})

            .then(function(me) {
            
                  Materialize.toast('Bio successfully updated', 2000);          

            })

            .catch(function(err) {

                showErrorToastAndResetBioValue();
            
            });
    
    }

    function bioHasChanged(bio1,bio2) {
    
        return bio1 !== bio2;

    }

})();
