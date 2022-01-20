function init(){

    fetch('http://127.0.0.1:8001/admin/tournaments', {
    })
        .then(res => res.json())
        .then(data => {
            
            const list = document.getElementById('tournamentList');

            list.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Description </th> <th> Date </th> <th> Time </th> <th> Event </th> <th>Bracket</th> </tr>`;
            data.forEach( el => {
                
                fetch('http://127.0.0.1:8001/admin/events/' + el.eventId, {

                })
                    .then(res => res.json())
                    .then(event => {

                        fetch('http://127.0.0.1:8001/admin/brackets/' + el.bracketId, {

                        })
                            .then(res => res.json())
                            .then(bracket => {

                                if(el.bracketId != -1){
                                    list.innerHTML += `<tr> <td> ${el.id} </td> <td>${el.name} </td> <td> ${el.description} </td> <td> ${el.date}</td> <td> ${el.time} </td> <td>${event.name}</td> <td>${bracket.name} (${bracket.type})</td>`;
                                } else {
                                    list.innerHTML += `<tr> <td> ${el.id} </td> <td>${el.name} </td> <td> ${el.description} </td> <td> ${el.date}</td> <td> ${el.time} </td> <td>${event.name}</td> <td> <butto class="btn btn-warning">Not defined</a> </td>`;
                                }
                            })

                    })

            })
            });

}