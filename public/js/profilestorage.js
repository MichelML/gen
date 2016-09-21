var ME = {};
ME.name = $('#me-name').text();
ME.image = $('#me-image').attr('src');
ME.email = $('#me-email').text();
ME.firstname = $('#me-firstname').text();
localforage.setItem('me', ME).then(function() {
    return localforage.getItem('me');
}).then(function(value) {
    // we got our value
    console.dir(value);
}).catch(function(err) {
    // we got an error
    console.log(err);
});
