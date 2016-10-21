'use strict';
require('dotenv').config();

const nodemailer = require('nodemailer'),
      transporter = nodemailer.createTransport(process.env.MAIL_TRANSPORTER);

function sendMailToGuests(mailoptions) {

    transporter.sendMail(mailoptions, (err, info) => {

        if (err) {

            return console.log(err);

        }

        console.log('Message sent: ' + info.response);

    });

}

function setMailOptions(form, emailtemplate) {

    var mailOptions = {

        from: '"⟡ ' + form['displayname'] + ' ⟡ via ' + 'Gen Events" <' + process.env.EMAIL_ADDRESS + '>', // sender address
        to: form['guests-event'], // list of receivers
        subject: form['name-event'] + '- invitation', // Subject line
        text: emailtemplate

    };

    return mailOptions;

}

function prepareEmail(form) {

    var email = 'Hi!\n\nYou have received an invitation for an event from the following GEN user:\n\n';
    email += form['displayname'] + ' <' + form['user'] + '>\n\n';
    email += 'Below are the details of the event:\n\n';
    email += '===================================\n\n';
    email += '** ' + form['name-event'].toUpperCase() + ((form['type-event']) ? ' (' + form['type-event'] + ') **' : ' **') + '\n\n';
    email += 'Hosted by ' + form['host-event'] + '\n\n';
    email += (form['tel-event'] || form['mail-event'] || form['link-event']) ? 'Contact information:\n' : '';
    email += (form['tel-event']) ? 'tel: ' + form['tel-event'] + '\n' : '';
    email += (form['mail-event']) ? 'email: ' + form['mail-event'] + '\n' : '';
    email += (form['link-event']) ? 'website: ' + form['link-event'] : '';
    email += (form['tel-event'] || form['mail-event'] || form['link-event']) ? '\n\n' : '';
    email += 'Location of the event: ' + form['place-event'] + '\n\n';
    email += 'Start Date of the event: ' + form['startdate-event'] + ' at ' + form['starttime-event'] + '\n';
    email += 'End Date of the event: ' + form['enddate-event'] + ' at ' + form['endtime-event'] + '\n\n';
    email += (form['details-event']) ? 'Additional details left for the guests:\n\n' + form['details-event'] + '\n\n' : '';
    email += '===================================\n\n';
    email += 'The organizer may have sent you an additional email for you to confirm your presence.\n\n';
    email += 'All the best,\n\n' + form['displayname'] + ' and the GEN team'; 

    return email;

}

exports.sendMailToGuests = sendMailToGuests;
exports.setMailOptions = setMailOptions;
exports.prepareEmail = prepareEmail;
