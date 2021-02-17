const form = document.querySelector('#form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

emailInput.addEventListener('focus', e => {
    const emailWarning = document.querySelector('#email-warning');
    emailWarning.textContent = '';
});

passwordInput.addEventListener('focus', e => {
    const passwordInput = document.querySelector('#password-warning');
    passwordInput.textContent = '';
});

const sendUserObject = userObject => {
    const url = "https://sb-my-todolist.herokuapp.com/api/v1/user/read";

    fetch (url, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(userObject)
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
        if (user.message === 'email-error') {
            const emailWarning = document.querySelector('#email-warning');
            emailWarning.textContent = 'E-mail não encontrado';
        } else if (user.message === 'password-error') {
            const passwordWarning = document.querySelector('#password-warning');
            passwordWarning.textContent = 'Senha incorreta';
        } else {
            sessionStorage.setItem('userName', user.name);
            sessionStorage.setItem('userEmail', user.email);
            location.href = 'panel/panel.html';
        }
    });
}

const createUserObject = (email, password) => {
    const userObject = Object.create(null);
    userObject.email = email;
    userObject.password = password;

    sendUserObject(userObject);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    createUserObject(email, password);
});