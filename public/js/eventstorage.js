setTimeout(function() {
    $('.selectize-control').removeClass('event-input');
    $('.selectize-dropdown').removeClass('event-input')
}, 1000);

var currentEvent = {};
var currentElem = '';
var submitEvent = function() {
    $('.event-input').each(function() {
        currentElem = $(this);
        currentEvent[currentElem.attr('id').replace(/-event/, '')] = currentElem.val();
    });
    localforage.setItem('currentEvent', currentEvent).then(function() {
        return localforage.getItem('currentEvent');
    }).then(function(value) {
        // we got our value
        console.dir(value);
    }).catch(function(err) {
        // we got an error
        console.log(err);
    });
};
