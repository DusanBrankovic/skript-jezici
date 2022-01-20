function init() {
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:8001/admin/events/' + id)
    .then( res => res.json() )
    .then( data => {
        document.getElementById('name').value = data.name;
        document.getElementById('description').value = data.description;
        document.getElementById('dateFrom').value = data.dateFrom;
        document.getElementById('dateTo').value = data.dateTo;
    });

    document.getElementById('updateEventBtn').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                dateFrom: document.getElementById('dateFrom').value,
                dateTo: document.getElementById('dateTo').value
            };
    
            fetch('http://127.0.0.1:8001/admin/events/'+ id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => {
                window.location.href='/admin/events';
            })
    
        });
}