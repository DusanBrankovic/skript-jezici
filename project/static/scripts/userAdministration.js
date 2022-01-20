function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8001/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then( data => {
            
            const list = document.getElementById('userList');

            list.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Email </th> <th> Admin </th> <th> Mod </th> <th> Action </th> </tr>`;
            data.forEach( el => {
                list.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.email}</td> <td> ${el.admin} </td> <td> ${el.mod} </td> <td>
                <a href="/admin/users/updateUser/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button id="${el.id}" class="btn btn-danger" onclick="deleteUser(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        })

    document.getElementById('registerBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value, 
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
            mod: document.getElementById('mod').checked
        };

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('staff').checked = false;
        document.getElementById('admin').checked = false;
        document.getElementById('mod').checked = false;
        
        fetch('http://127.0.0.1:8001/admin/users', {
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
                
                document.getElementById('userList').innerHTML += `<tr> <td> ${data.id} </td> <td> ${data.name} </td> <td> ${data.email}</td> <td> ${data.admin} </td> <td> ${data.mod} <td>
                <a href="/admin/users/updateUser/${data.id}" class="btn btn-primary update">
                   Update
                </a>
                <button id="${data.id}" class="btn btn-danger " onclick="deleteUser(this)">
                Delete
              </button>
            </td> </tr>`;
            
            })
    });

}

function showAdmin() {
    var adminCheck = document.getElementById("adminCheck");
    var modCheck = document.getElementById("modCheck");
    if (adminCheck.style.display === "none" && modCheck.style.display === "none") {
        adminCheck.style.display = "block";
        modCheck.style.display = "block";
    } else {
        adminCheck.style.display = "none";
        modCheck.style.display = "none";
    }
  }

function deleteUser(obj) {

    let id;
    id = obj.getAttribute('id');

    fetch('http://127.0.0.1:8001/admin/users/' + id, {
        method: 'DELETE'
    })

    var table = document.getElementById('userList');
    let i, row, colId;

    for (i = 1, row; row = table.rows[i]; i++) {
        colId = row.cells[0].innerText;
        if(colId === id){
            document.getElementsByTagName('tr')[i].remove();
        }
    }  
}
