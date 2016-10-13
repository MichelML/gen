module.exports = {
    isValidEmail: (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    },

    isValidPassword: (pw) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pw);
    },

    isPasswordConfirmMatching: (pw1, pw2) => {
        return pw1 === pw2;
    }
}


var eventFormValidator = () => {

    return {

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

};

module.exports = eventFormValidator;
