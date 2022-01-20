function init() {
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:8001/admin/users/' + id)
    .then( res => res.json() )
    .then( data => {
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('password').value = data.password;
        document.getElementById('admin').checked = data.admin;
        document.getElementById('mod').checked = data.mod;
    });

    document.getElementById('updateUserBtn').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                name: document.getElementById('name').value,
                admin: document.getElementById('admin').checked,
                mod: document.getElementById('mod').checked
            };
    
            fetch('http://127.0.0.1:8001/admin/users/'+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => {
                window.location.href='/admin/users';
            })
    
        });
}