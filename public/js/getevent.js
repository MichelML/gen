var $spinnerwhite = $('#spinnerdiv-white');
$spinnerwhite.hide();

$(document).ready(function() {

    $spinnerwhite.show();

    localforage.getItem('me')

    .then(function(me) {
        
        if (!me) {

             window.location.replace('/');

        }

        $.post('/events/' + me.email)
        
        .then(function(events) {
        
           $spinnerwhite.fadeOut();

           if (events.length > 0) {
           
               $('#no-events').hide();

               var eventHTMLStrings = createEventsHTMLEntries(events);
               $('#events-list').append(eventHTMLStrings); 
           
           }
            
        })

        .catch(function(err) {

            if (err.responseText !== "No data returned from the query.") {
            
                $('#no-events').text('An error occured while retrieving your events.');
                
                $spinnerwhite.hide();

            }

            else {
            
                $spinnerwhite.hide(); 
            
            } 

        })

    })

    .catch(function(err) {

        window.location.replace('/')

    });

    function createEventsHTMLEntries(events) {
        console.dir(events);
        var allEventsHTML = ' ';
        var template = '<li class="collection-item avatar"><i class="material-icons circle">event</i><span class="title">%name%</span> <p>%date%<br>%time%</p> <a href="#!" class="secondary-content"><i class="material-icons">%type%</i></a> </li>'; 
        var entry;

        events.forEach(function (event) {
        
            entry = template.replace('%name%', event.eventname);
            entry = entry.replace('%date%', event.eventstartdate);
            entry = entry.replace('%time%', event.eventstarttime);
            entry = entry.replace('%type%', (event.style === 'social') ? 'people' : 'person');

            allEventsHTML += entry; 

            entry = template;

        });

        return allEventsHTML;
    
    }

});
