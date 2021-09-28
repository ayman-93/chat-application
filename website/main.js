// if not loged in redirect to login page
if (!localStorage.getItem("user") && (window.location.pathname !== "/website/signup/signup.html" && window.location.pathname !== "/website/login/login.html")) {
    window.location.replace('/login/login.html')
}


document.onreadystatechange = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById('userName').innerText = `Wellcome ${user.name}`
}