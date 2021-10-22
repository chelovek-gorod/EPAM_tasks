"use strict";

let userLogin = false;

const dayNightInput = document.getElementById('dayNightInput');
dayNightInput.onchange = () =>  changeTheme ();

const loginInput  = document.getElementById('loginInput');
const loginBtn  = document.getElementById('loginBtn');
loginBtn.onclick = () => clockLogin();

if (localStorage.getItem('user')) {
    userLogin = loginInput.disabled = true;
    loginInput.value = `Hello, ${localStorage.getItem('user')}!`;
    loginInput.classList.toggle('logged');
    loginBtn.innerHTML = 'Log Out';
}

if (localStorage.getItem('night')) {
    if (localStorage.getItem('night') === 'true') {
        dayNightInput.checked = true;
        document.body.classList.toggle('night', dayNightInput.checked);
    }
}

function changeTheme () {
    document.body.classList.toggle('night', dayNightInput.checked);
    localStorage.setItem('night', dayNightInput.checked);
}

function clockLogin() {
    if (userLogin) {
        loginInput.classList.toggle('logged');
        userLogin = loginInput.disabled = false;
        loginInput.value = '';
        loginBtn.innerHTML = 'Login';
        localStorage.removeItem('user'); 
    } else {
        let user = loginInput.value.trim();
        if (user) {
            localStorage.setItem('user', user);
            loginBtn.innerHTML = 'Log Out';
            loginInput.value = `Hello, ${localStorage.getItem('user')}!`;
            loginInput.classList.toggle('logged');
            userLogin = loginInput.disabled = true;
        } else alert ('Invalid login inputted!');
    }
}