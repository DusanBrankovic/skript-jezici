function init() {

    fetch('http://127.0.0.1:8001/admin/events', {
    })
        .then(res => res.json())
        .then(data => {
            
            const list = document.getElementById('eventList');

            list.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Description </th> <th> From </th> <th> To </th> <th> Action </th> </tr>`;
            data.forEach( el => {
                list.innerHTML += `<tr> <td> ${el.id} </td> <td> <a href="/admin/events/${el.id}/tournaments">${el.name}</a> </td> <td> ${el.description} </td> <td> ${el.dateFrom}</td> <td> ${el.dateTo} </td> 
                    <td> <a href="/admin/events/updateEvent/${el.id}" class="btn btn-success">Update</a>
                    <button id="${el.id}" class="btn btn-danger" onclick="deleteEvent(this)">Delete</button> </td> </tr>`;
            });

        })
    
    document.getElementById('addEventBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value, 
            dateFrom: document.getElementById('dateFrom').value,
            dateTo: document.getElementById('dateTo').value
        };

        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dateTo').value = '';
        document.getElementById('dateFrom').value = '';
        
        fetch('http://127.0.0.1:8001/admin/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json())
            .then( data => {
                if(data.msg){
                    alert(data.msg);
                    return;
                }
                
                document.getElementById('eventList').innerHTML += `<tr> <td> ${data.id} </td> <td> <a href="/admin/events/${data.id}/tournaments">${data.name}</a> </td> <td> ${data.description} </td> <td> ${data.dateFrom}</td> <td> ${data.dateTo} </td> 
                <td> <a href="/admin/events/updateEvent/${data.id}" class="btn btn-success">Update</a>
                <button id="${data.id}" class="btn btn-danger" onclick="deleteEvent(this)">Delete</button> </td> </tr>`;
            
            })
    });
    

}

function deleteEvent(obj) {

    let id;
    id = obj.getAttribute('id');

    // Pre deleta za event zovem njegove tournamente i prvo brisem njih

    fetch('http://127.0.0.1:8001/admin/events/' + id, {
        method: 'DELETE'
    })

    var table = document.getElementById('eventList');
    let i, row, colId;

    for (i = 1, row; row = table.rows[i]; i++) {
        colId = row.cells[0].innerText;
        if(colId === id){
            document.getElementsByTagName('tr')[i].remove();
        }
    }  
}

