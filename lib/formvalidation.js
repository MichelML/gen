const eventFormValidator = {};

eventFormValidator.inputs = {

    checkEventName: (eventName) => {

        return /^[a-zA-Z0-9\-]{1,200}$/.test(eventName);

    },

    checkEventType: (eventType) => {

        return /^[a-zA-Z\-]{1,200}$/.test(eventType) || !eventType;

    },

    checkEventLocation: (eventLocation) => {
    
        return /^.{1,1000}$/.test(eventLocation);

    },

    checkEventDate: (eventDate) => {

        return eventDate;

    },

    checkEventTime: (eventTime) => {

        return eventTime;

    },

    checkEventDetails: (eventDetails) => {

        return /^.{0,10000}/.test(eventDetails) || !eventDetails;

    }

};

eventFormValidator.type = {

    isPersonalEvent: (form) => {

        return form['type'] === 'personal';

    },

    isSocialEvent: (form) => {

        return form['type'] === 'social';

    }

};

eventFormValidator.form = {
    
    personalEventFormIsValid: (form) => {

        return  eventFormValidator.type.isPersonalEvent(form) && 
                eventFormValidator.inputs.checkEventName(form['name-event']) && 
                eventFormValidator.inputs.checkEventType(form['type-event']) &&
                eventFormValidator.inputs.checkEventLocation(form['place-event']) &&
                eventFormValidator.inputs.checkEventDate(form['startdate-event'] && 
                eventFormValidator.inputs.checkEventTime(form['starttime-event'] &&
                eventFormValidator.inputs.checkEventDate(form['enddate-event'] && 
                eventFormValidator.inputs.checkEventTime(form['endtime-event']) &&
                eventFormValidator.inputs.checkEventDetails(form['details-event']);

    }

};

module.exports = eventFormValidator;
