function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    document.getElementById('userAdminBtn').addEventListener('click', e => {
        if(token === ''){
            alert('You are not logged in!');
        }
        else{
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let id = res.userId;
            console.log(id);

            fetch('http://127.0.0.1:8001/admin/users/' + id)
            .then(res => res.json())
            .then(data => {
                if(data.admin)
                    window.location.href = '/admin/users';
                else
                    alert('Only admin has permission for this!');
        })
       }
        
    });

    document.getElementById('eventAdminBtn').addEventListener('click', e => {
        if(token === ''){
            alert('You are not logged in!');
        }
        else{
            let payload = token.split('.')[1];
            let res = JSON.parse(atob(payload));
            console.log(res);
            let id = res.userId;
            console.log(id);

            fetch('http://127.0.0.1:8001/admin/users/' + id)
            .then(res => res.json())
            .then(data => {
                if(data.admin || data.mod)
                    window.location.href = '/admin/events';
                else
                    alert('Only admins and moderators have permission for this!');
        })
       }
        
    });

    document.getElementById('logoutBtn').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = '/login';
    });
}