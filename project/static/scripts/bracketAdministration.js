function init(){

    fetch('http://127.0.0.1:8001/admin/brackets', {
    })
        .then(res => res.json())
        .then(data => {
            console.log("uso");
            const list = document.getElementById('bracketList');

            list.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Type </th> <th> Size </th> <th> Reserved </th> <th> Status </th> <th> Action </th> </tr>`;
            data.forEach( el => {

                if(el.tournamentId == -1){
                    if(el.status == false){
                        list.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.type} </td> <td> ${el.size}</td> <td> ${el.reserved} </td> <td> <button itemid="${el.id}" onclick="changeAvailable(this)" class="btn btn-success">available</button> </td> 
                            <td> <a href="/admin/events/updateEvent/${el.id}" class="btn btn-success">Update</a>
                            <button id="${el.id}" class="btn btn-danger" onclick="deleteEvent(this)">Delete</button> </td> </tr>`;
                    } else {
                        list.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.type} </td> <td> ${el.size}</td> <td> ${el.reserved} </td> <td> <label itemid="${el.id}" style="color:red">unavailable</button> </td> 
                            <td> <a href="/admin/events/updateEvent/${el.id}" class="btn btn-success">Update</a>
                            <button id="${el.id}" class="btn btn-danger" onclick="deleteEvent(this)">Delete</button> </td> </tr>`;
                    }
                }
            });

        })
    
    document.getElementById('addBracketBtn').addEventListener('click', e => {
        e.preventDefault();

        let sType;
        var radios = document.getElementsByName('type');
        for (i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                sType = radios[i].value;
                break;
            }
        }
        
        const data = {
            name: document.getElementById('name').value,
            type: sType, 
            size: document.getElementById('size').value
        };

        document.getElementById('name').value = '';
        document.getElementById('size').value = '';
        
        fetch('http://127.0.0.1:8001/admin/brackets', {
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
                
                document.getElementById('bracketList').innerHTML += `<tr> <td> ${data.id} </td> <td> ${data.name} </td> <td> ${data.type} </td> <td> ${data.size}</td> <td> ${data.reserved} </td> <td> <button itemid="${data.id}" onclick="changeAvailable(this)" class="btn btn-success">available</button> </td> 
                <td> <a href="/admin/events/updateEvent/${data.id}" class="btn btn-success">Update</a>
                <button id="${data.id}" class="btn btn-danger" onclick="deleteEvent(this)">Delete</button> </td> </tr>`;
            
            })
    });
}

function changeAvailable(obj){

    const urlParams = window.location.href.split('/');
    let currTourId = urlParams[urlParams.length-2];

    let id = obj.getAttribute('itemid');

    let list = document.getElementById('bracketList');
    let i, row, colId;

    for(i = 1, row ; row = list.rows[i] ; i++) {
        colId = row.cells[0].innerText;

        if(colId == id){
            document.getElementsByTagName('tr')[i].remove();
        }
    }

    fetch('http://localhost:8001/admin/brackets/' + id, {
    })
        .then(res => res.json())
        .then(el => {

            const data = {
                name: el.name,
                type: el.type,
                size: el.size,
                status: true,
                tournamentId: currTourId
            };

            fetch('http://localhost:8001/admin/brackets/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(el => {
                    
                    fetch('http://localhost:8001/admin/tournaments/' + currTourId, {
                    })
                    .then(res => res.json())
                    .then(el => {

                        const data2 = {
                            name: el.name,
                            description: el.description,
                            date: el.date,
                            time: el.time,
                            bracketId: id
                        };
        
                        fetch('http://localhost:8001/admin/tournaments/' + currTourId, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data2)
                        })
                            .then(res => res.json())
                            .then(el => {
                                window.location.href='/admin/events/' + el.eventId + '/tournaments';
                            })
                    })
                })

            list.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.type} </td> <td> ${el.size}</td> <td> ${el.reserved} </td> <td> <label itemid="${el.id}" style="color:red">unavailable</button> </td> 
                        <td> <a href="/admin/events/updateEvent/${el.id}" class="btn btn-success">Update</a>
                        <button id="${el.id}" class="btn btn-danger" onclick="deleteEvent(this)">Delete</button> </td> </tr>`;
        })

}