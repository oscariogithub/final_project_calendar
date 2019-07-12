$(document).on('ready turbolinks:load', function(){
    $.ajaxSetup({
        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
    });
    $('#calendar').fullCalendar({
        events: '/events', 
        color: 'yellow',       
        textColor: 'black',
        lang: 'es',
        defaultView: 'agendaWeek',
        allDaySlot: false,
        minTime: "09:00:00",
        maxTime: "18:00:00",
        slotDuration: "00:30:00",
        slotLabelInterval: "00:30:00",
        slotLabelFormat: "h(:mm)a",
        defaultTimedEventDuration:'00:30',
        plugins: [ 'interaction' ],
        eventDrop: function(event, delta, revertFunc) {
                    console.log(delta);
                    $.ajax({
                        url: 'events/' + event.id,
                        type: 'PATCH',
                        dataType: 'JSON',
                        data: {event: {start: event.start.format() }}
                    })
        },
        eventClick: function(event){
                    $.ajax({
                        url: '/events/' + event.id + '/edit',
                        type: 'GET',
                        dataType: 'script'
                    })
        }
    });
});