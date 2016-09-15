var contacts = [],
    names = $('.contact-name'),
    emails = $('.contact-email');

names.each(function(i) {
    contacts.push({
        name: $(this).text(),
        email: $(emails[i]).text()
    })
});

$(document).ready(function(event) {
    // selectize.js below
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' + '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    var $guestsEvent = $('#guests-event').selectize({
        plugins: ['remove_button'],
        persist: false,
        maxItems: null,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: contacts,
        render: {
            item: function(item, escape) {
                setTimeout(function() {
                    $("#guests-event-selectized").focus();
                }, 4);
                return '<div class="guest-item">' + (item.name ? '<span class="name">' + escape(item.name) + '</span><br>' : '') + (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') + '</div>';
            },
            option: function(item, escape) {
                var label = item.name || 'unnamed';
                var caption = item.email;
                return '<div class="guest-selectable">' + '<span class="label">' + escape(label) + '</span><br>' + (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') + '</div>';
            }
        },
        createFilter: function(input) {
            var match, regex;
            regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[0]);
            regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[2]);
            return false;
        },
        create: function(input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {
                    email: input
                };
            }
            var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email: match[2],
                    name: $.trim(match[1])
                };
            }
            alert('Invalid email address.');
            return false;
        }
    });
    var $guestsInput = $("#guests-event-selectized");
    $('#lab-guests-event').css('font-size', $('label').first().css('font-size'));
    $('h5.label').css('font-size', $('label').first().css('font-size'));

    var $selectize = $guestsEvent[0].selectize;

    // Sort contacts selected by name then by email only
    $guestsInput.on('keyup focus click', function() {
        if (!$guestsInput.val()) $selectize.close();
        else $selectize.open();
    });

});
