function init(){

    document.getElementById('registerBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            region: document.getElementById('region').value
        };

        fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( el => {
            document.cookie = `token=${el.token};SameSite=Lax`;
            window.location.href = 'welcome.html';
        })
    })
}