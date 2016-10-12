localforage.getItem('event')

.then(function(eventp) {

    console.log(eventp);
    ko.cleanNode(document);
    ko.applyBindings(eventp, document.getElementById('event-info'));

})

.catch(function(err) {

    console.log(err);

});
