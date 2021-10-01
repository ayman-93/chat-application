// if loged in rederct to home page
if (localStorage.getItem("user")) {
    window.location.replace('/index.html')
}

const signUp = document.getElementById('signUp');


const userName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confPassword = document.getElementById('confPassword');

const signUpf = (e) => {
    console.log("submit");
    e.preventDefault();


    const body = JSON.stringify({
        name: userName.value,
        email: email.value,
        password: password.value
    })
    fetch('http://localhost/chat-application/authentication/api/user/create.php', {
        method: 'POST',
        body: body
    }).then(res => res.json())
        .then(data => {
            if (data.email) {
                localStorage.setItem("user", JSON.stringify(data))
                window.location.replace('/index.html')
            } else {
                // Something wrong
            }
        })
        .catch(err => { document.getElementById('wrongAlert').style.display = "inline-block" });

}

const ValidatePassword = () => {
    if (password.value !== confPassword.value) {
        confPassword.setCustomValidity("Passwords Don't Match'");
    } else {
        confPassword.setCustomValidity('');
    }
}
password.onkeyup = ValidatePassword;
confPassword.onkeyup = ValidatePassword;

signUp.onsubmit = signUpf;


