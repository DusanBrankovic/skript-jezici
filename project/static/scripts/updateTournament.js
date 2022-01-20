function init() {
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];
    let eventId = urlParams[5];

    fetch('http://127.0.0.1:8001/admin/tournaments/' + id)
    .then( res => res.json() )
    .then( data => {
        document.getElementById('name').value = data.name;
        document.getElementById('description').value = data.description;
        document.getElementById('date').value = data.date;
        document.getElementById('time').value = data.time;
    });

    document.getElementById('updateTournamentBtn').addEventListener('click', e => {
            e.preventDefault();
           
            fetch('http://127.0.0.1:8001/admin/tournaments/' + id)
            .then( res => res.json() )
            .then( data => {
                
                const data1 = {
                    name: document.getElementById('name').value,
                    description: document.getElementById('description').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    eventId: data.eventId,
                    bracketId: data.bracktId
                };
        
                fetch('http://127.0.0.1:8001/admin/tournaments/'+ id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data1)
                }).then(res => {
                    window.location.href='/admin/events/' + eventId + '/tournaments';
                })

            });
    
        });
}