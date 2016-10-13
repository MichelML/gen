var express = require('express'),
    app = express();

app.get('/eventpersonal', (request, response) => {
    response.render('./app/blocks/eventpersonal');
});

app.post('/eventpersonal', (request, response) => {
    var reqBody = request.body;
    console.log(reqBody);
    response.send('success'); 
});

module.exports = app;


function formIsValid(formdata) {

    return  validator.checkEventName($eventName.val()) && 
            validator.checkEventType($eventType.val()) &&
            validator.checkEventLocation($eventLocation.val()) &&
            validator.checkEventDate($eventStartDate.val()) && 
            validator.checkEventTime($eventStartTime.val()) &&
            validator.checkEventDate($eventEndDate.val()) && 
            validator.checkEventTime($eventEndTime.val()) &&
            validator.checkEventDetails($eventDetails.val());

}
