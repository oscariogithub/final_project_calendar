$(document).on('ready turbolinks:load', function(){
    $.ajaxSetup({
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
    });
    $('#calendar').fullCalendar({
        plugins: [ 'interaction' ],
        selectable: true,
        events: '/events', 
        color: 'yellow', 
        contentHeight: 'auto',      
        eventTextColor: 'white',
        lang: 'es',
        defaultView: 'agendaWeek',
        allDaySlot: false,
        firstDay: 1, 
        minTime: "09:00:00",
        maxTime: "18:00:00",
        slotDuration: "00:30:00",
        slotLabelInterval: "00:30:00",
        slotLabelFormat: "h(:mm)a",
        defaultTimedEventDuration:'00:30',
        
        eventDrop: function(event, delta, revertFunc) {
                    console.log(delta);
                    $.ajax({
                        url: 'events/' + event.id,
                        type: 'PATCH',
                        dataType: 'JSON',
                        data: {event: {start: event.start.format() }}
                    })
        },
        
        select: function(event){
                    $.ajax({
                        url: '/events/new',
                        type: 'GET',
                        dataType: 'script'
                    })
        }
    });
});