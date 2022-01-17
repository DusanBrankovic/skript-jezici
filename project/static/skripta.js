function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    //Ovako dobija onfomacije koje smesta u listu Usera
    fetch('http://localhost:8000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`; //Ovde smesta direktno kao html zapis
            });
        });

    //Ovako dobija info koje smesta u listu poruka
    fetch('http://localhost:8000/api/messages', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('msgLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Body: ${el.body}, User: ${el.user.id}</li>`; //Ovde smesta direktno kao html zapis
            });
        });

    //Stavljamo listener na dugme koje salje poruku
    document.getElementById('msgBtn').addEventListener('click', e => {
        e.preventDefault();

        //Ne hvata userId jer njega vec imamo kroz token, hvata samo samu poruku
        const data = {
            body: document.getElementById('body').value
        };

        //Setuje u html-u na prazno, tu gde je bila poruka
        document.getElementById('body').value = '';

        //Salje request app.js na putanju messages
        fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: { //Ovde ne saljemo cookie vec u header smestamo token u polje 'Authorization'
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` //Ovaj token ovde je izvucen iz cookie-ja. To se radi u liniji 4 ovde. Stranicama je zajednicki cookie token. Ovaj token je smesten tu prilikom login-a
            },
            body: JSON.stringify(data) //Pakuje tekst poruke u json
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('msgLst').innerHTML += `<li>ID: ${el.id}, Body: ${el.body}</li>`;
                }
            });
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}