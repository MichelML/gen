function signOut() {
    localforage.clear()
        .then(function() {
             window.location.replace('/');                   
        });
}

$(document).ready(function () {

    $('.signout').each(function() {

        $(this).on('click', function() {
        
            signOut();

        });

    });

});

