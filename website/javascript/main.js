// if not loged in redirect to login page
if (!localStorage.getItem("user") && (window.location.pathname !== "signup.html" && window.location.pathname !== "login.html")) {
    window.location.replace('login.html')
}


document.onreadystatechange = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById('welcomeMessage').innerText = `Wellcome ${user.name}`
}