function init(){

    const urlParams = window.location.href.split('/');
    let currEventId = urlParams[urlParams.length-2];

    fetch('http://127.0.0.1:8001/admin/events/' + currEventId, {
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('eventName').innerHTML = data.name;
        })

    fetch('http://127.0.0.1:8001/admin/tournaments', {
    })
        .then(res => res.json())
        .then(data => {
            
            const list = document.getElementById('tournamentList');

            list.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Description </th> <th> Date </th> <th> Time </th> <th> Event </th> <th>Bracket</th> <th>Action</th> </tr>`;
            data.forEach( el => {
                
                if(el.eventId == currEventId){
                    if(el.bracketId != -1){
                        list.innerHTML += `<tr> <td> ${el.id} </td> <td>${el.name} </td> <td> ${el.description} </td> <td> ${el.date}</td> <td> ${el.time} </td> <td>${el.eventId}</td> <td>${el.bracketId}</td>
                        <td> <a href="/admin/events/${currEventId}/updateTournament/${el.id}" class="btn btn-success">Update</a>
                        <button id="${el.id}" class="btn btn-danger" onclick="deleteTournament(this)">Delete</button> </td> </tr>`;
                    } else {
                        list.innerHTML += `<tr> <td> ${el.id} </td> <td>${el.name} </td> <td> ${el.description} </td> <td> ${el.date}</td> <td> ${el.time} </td> <td>${el.eventId}</td> <td> <a href=/admin/events/${el.eventId}/tournaments/${el.id}/chooseBracket class="btn btn-warning">Choose</a> </td>
                        <td> <a href="/admin/events/${currEventId}/updateTournament/${el.id}" class="btn btn-success">Update</a>
                        <button id="${el.id}" class="btn btn-danger" onclick="deleteTournament(this)">Delete</button> </td> </tr>`;
                    }
                }
            });

        })

        document.getElementById('addTournamentBtn').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value, 
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                eventId: currEventId
            };
    
            document.getElementById('name').value = '';
            document.getElementById('description').value = '';
            document.getElementById('date').value = '';
            document.getElementById('time').value = '';
            
            fetch('http://127.0.0.1:8001/admin/tournaments', {
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
                    
                    document.getElementById('tournamentList').innerHTML += `<tr> <td> ${data.id} </td> <td>${data.name} </td> <td> ${data.description} </td> <td> ${data.date}</td> <td> ${data.time} </td> <td>${data.eventId}</td> <td> <a href=/admin/events/${data.eventId}/tournaments/${data.id}/chooseBracket class="btn btn-warning">Choose</a> </td>
                        <td> <a href="/admin/events/${currEventId}/updateTournament/${data.id}" class="btn btn-success">Update</a>
                        <button id="${data.id}" class="btn btn-danger" onclick="deleteTournament(this)">Delete</button> </td> </tr>`;
                
                })
        });
}

function deleteTournament(obj) {

    let id;
    id = obj.getAttribute('id');

    fetch('http://127.0.0.1:8001/admin/tournaments/' + id, {
        method: 'DELETE'
    })

    fetch('http://127.0.0.1:8001/admin/brackets/', {
    })
        .then(res => res.json())
        .then(el => {

            el.forEach(el => {
                if(el.tournamentId == id){
                    fetch('http://127.0.0.1:8001/admin/brackets/' + el.id, {
                        method:'DELETE'
                    })
                }
            });
        })

    var table = document.getElementById('tournamentList');
    let i, row, colId;

    for (i = 1, row; row = table.rows[i]; i++) {
        colId = row.cells[0].innerText;
        if(colId === id){
            document.getElementsByTagName('tr')[i].remove();
        }
    }  
}