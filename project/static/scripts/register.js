function init(){

    document.getElementById('registerBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            admin: document.getElementById('admin').checked,
            mod: document.getElementById('mod').checked
        };

        fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( el => {
            document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = '/admin/';
        })
    })
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