function initErrorMessage(element, errorMessage, before) {
    
    var errorMessageHTML = '<div style="font-size:12px;" class="red-text ' + element.attr('id') + ' hide">' + errorMessage + '</div>';

    if (before) {
        element.before(errorMessageHTML);
    }
    else {
        element.after(errorMessageHTML);
    }

    $errorMessageSelector = $('.' + element.attr('id'));
    
    return $errorMessageSelector;

}

function isValidInput(element, validationregexp) {
    element.value = element.elem.val();
    element.isValid = validationregexp.test(element.value);
    if (!element.value) {
        element.elem.removeClass();
        element.errorMessage.addClass('hide');
     }
    else if (element.isValid) {
        element.elem.removeClass('invalid');
        element.elem.addClass('valid');
        if (element.errorMessage && !element.errorMessage.hasClass('hide')) {
            element.errorMessage.addClass('hide');
        }
    }
    else {
        element.elem.removeClass('valid');
        element.elem.addClass('invalid');
        if (element.errorMessage) {
            element.errorMessage.removeClass('hide');
        }
    }
}

var validator = {

    checkEventName: function(eventName) {

        return /^[a-zA-Z0-9\-\s]{1,200}$/.test(eventName);

    },

    checkEventType: function(eventType) {

        return /^[a-zA-Z\-\s]{1,200}$/.test(eventType) || !eventType;

    },

    checkEventHost: function(eventHost) {

        return /^[a-zA-Z\-\s]{1,200}$/.test(eventHost);

    },

    checkEventTel: function(eventTel) {

        return /^[0-9]{10,15}$/.test(eventTel) || !eventTel;

    },

    checkEventEmail: function(eventEmail) {

        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(eventEmail) || !eventEmail;

    },

    checkEventUrl: function(eventUrl) {

        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(eventUrl) || !eventUrl;

    },

    checkEventGuests: function(eventGuests) {

        var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        return eventGuests.split(',').reduce(function(old,newv) {
        
            if (true) {
                
                return emailRegexp.test(newv);     

            }
            
            else {
            
                return false; 
            
            }

        },true);

    },
    
    checkEventLocation: function(eventLocation) {
    
        return /^.{1,1000}$/.test(eventLocation);

    },

    checkEventDate: function(eventDate) {

        return eventDate;

    },

    checkEventTime: function(eventTime) {

        return eventTime;

    },

    checkEventDetails: function(eventDetails) {

        return /^.{0,10000}/.test(eventDetails) || !eventDetails;

    }

};


function toggleValidationClasses(elem, validatorFunction, errorMessage) {

    if (validatorFunction(elem.val())) {
    
        elem.removeClass('invalid');
        elem.addClass('valid');
        errorMessage.addClass('hide');

    }

    else {
    
        elem.removeClass('valid');
        elem.addClass('invalid');
        errorMessage.removeClass('hide');
    
    }

}

function toggleValidationClassesSelectize(elem, validatorFunction, errorMessage) {

    if (validatorFunction(elem.val())) {
    
        errorMessage.addClass('hide');

    }

    else {
    
        errorMessage.removeClass('hide');
    
    }

}
