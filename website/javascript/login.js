// if loged in rederct to home page
if (localStorage.getItem("user")) {
    window.location.replace('/index.html')
}

const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');


const loginf = (e) => {
    e.preventDefault();
    console.log("login submit");

    const body = JSON.stringify({ email: email.value, password: password.value });

    fetch('http://localhost/chat-application/authentication/api/user/read_single.php', {
        method: 'POST',
        body: body
    }).then(res => {
        console.log(res);
        return res.json()
    })
        .then(data => {
            console.log("data ", data);
            if (data.email) {
                localStorage.setItem("user", JSON.stringify(data))
                window.location.replace('/index.html')
            } else {
                // worng password or email
                document.getElementById('wrongAlert').style.display = "inline"
            }
        })
        .catch(err => {
            console.log(err)
        });
}

login.onsubmit = loginf;

