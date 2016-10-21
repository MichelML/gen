'use strict';
const eventFormValidator = {};

eventFormValidator.inputs = {

    checkEventName: (eventName) => {

        return /^[a-zA-Z0-9\-\s]{1,200}$/.test(eventName);

    },

    checkEventType: (eventType) => {

        return /^[a-zA-Z\-\s]{1,200}$/.test(eventType) || !eventType;

    },

    checkEventHost: (eventHost) => {

        return /^[a-zA-Z\-\s]{1,200}$/.test(eventHost);

    },

    checkEventTel: (eventTel) => {

        return /^[0-9]{10,15}$/.test(eventTel) || !eventTel;

    },

    checkEventEmail: (eventEmail) => {

        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(eventEmail) || !eventEmail;

    },

    checkEventUrl: (eventUrl) => {

        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(eventUrl) || !eventUrl;

    },

    checkEventGuests: (eventGuests) => {
    
        return eventGuests;

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

    isPersonalEvent: (formtype) => {

        return formtype === 'personal';

    },

    isSocialEvent: (formtype) => {

        return formtype === 'social';

    }

};

eventFormValidator.form = {
    
    personalEventFormIsValid: (form) => {

        return  eventFormValidator.type.isPersonalEvent(form['type']) && 
                eventFormValidator.inputs.checkEventName(form['name-event']) && 
                eventFormValidator.inputs.checkEventType(form['type-event']) &&
                eventFormValidator.inputs.checkEventLocation(form['place-event']) &&
                eventFormValidator.inputs.checkEventDate(form['startdate-event']) && 
                eventFormValidator.inputs.checkEventTime(form['starttime-event']) &&
                eventFormValidator.inputs.checkEventDate(form['enddate-event']) && 
                eventFormValidator.inputs.checkEventTime(form['endtime-event']) &&
                eventFormValidator.inputs.checkEventDetails(form['details-event']);

    },

    socialEventFormIsValid: (form) => {
    
        return  eventFormValidator.type.isSocialEvent(form['type']) && 
                eventFormValidator.inputs.checkEventName(form['name-event']) && 
                eventFormValidator.inputs.checkEventType(form['type-event']) &&
                eventFormValidator.inputs.checkEventHost(form['host-event']) &&
                eventFormValidator.inputs.checkEventTel(form['tel-event']) &&
                eventFormValidator.inputs.checkEventEmail(form['mail-event']) &&
                eventFormValidator.inputs.checkEventUrl(form['link-event']) &&
                eventFormValidator.inputs.checkEventGuests(form['guests-event']) &&
                eventFormValidator.inputs.checkEventLocation(form['place-event']) &&
                eventFormValidator.inputs.checkEventDate(form['startdate-event']) && 
                eventFormValidator.inputs.checkEventTime(form['starttime-event']) &&
                eventFormValidator.inputs.checkEventDate(form['enddate-event']) && 
                eventFormValidator.inputs.checkEventTime(form['endtime-event']) &&
                eventFormValidator.inputs.checkEventDetails(form['details-event']);
    
    }

};

module.exports = eventFormValidator;
