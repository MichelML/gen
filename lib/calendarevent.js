function makeTimezoneOffsetISOString(timeOffsetInMinutes) {

    let hours = (Math.floor(timeOffsetInMinutes / 60)).toString(),
        minutes = (timeOffsetInMinutes % 60).toString();

    if (hours.length === 1 || (/^\-/.test(hours) && hours.length === 2)) {

        hours = "0" + hours;

    }

    if (minutes.length === 1) {

        minutes = "0" + minutes;

    }

    return (/^\-/.test(hours)) ? hours.replace('-', '+') + ":" + minutes : "-" + hours + ":" + minutes;

}

function makeStartDateTimeISOString(form) {

    let secondsExtension = ":00";

    return form['startdate-event'] + 'T' + form['starttime-event'] + secondsExtension + makeTimezoneOffsetISOString(form.timezoneOffset);

}

function makeEndDateTimeISOString(form) {

    let secondsExtension = ":00";

    return form['enddate-event'] + 'T' + form['endtime-event'] + secondsExtension + makeTimezoneOffsetISOString(form.timezoneOffset);

}

function convertContactsToList(contactsString) {

    return (contactsString) ? contactsString
        .split(',')
        .map(email => {
            return {
                'email': email
            };
        }) : [];
}

function convertSocialFormDataToCalendarEvent(form) {

    let socialevent = {

        'summary': form['name-event'].toUpperCase() + ((form['type-event']) ? ' (' + form['type-event'] + ') hosted by ' : ' hosted by ') + form['host-event'],
        'location': form['place-event'],
        'description': form['details-event'] || '',
        'start': {

            'dateTime': makeStartDateTimeISOString(form),

        },
        'end': {

            'dateTime': makeEndDateTimeISOString(form)

        },
        'attendees': convertContactsToList(form['guests-event']),
        'reminders': {

            'useDefault': true,

        }
    };

    return socialevent;

}

function convertPersonalFormDataToCalendarEvent(form) {

    let personalevent = {

        'summary': form['name-event'].toUpperCase() + ((form['type-event']) ? ' (' + form['type-event'] + ')' : ''),
        'location': form['place-event'],
        'description': form['details-event'] || '',
        'start': {

            'dateTime': makeStartDateTimeISOString(form),

        },
        'end': {

            'dateTime': makeEndDateTimeISOString(form)

        },
        'reminders': {

            'useDefault': true,

        }

    };

    return personalevent;

}

module.exports = {

    convertSocialFormDataToCalendarEvent: convertSocialFormDataToCalendarEvent,
    convertPersonalFormDataToCalendarEvent: convertPersonalFormDataToCalendarEvent

};
