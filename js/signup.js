const form = document.querySelector('#form');
const emailInput = document.querySelector('#email');

emailInput.addEventListener('focus', e => {
    const emailWarning = document.querySelector('#email-warning');
    emailWarning.textContent = '';
});

const sendUserObject = userObject => {
    const url = "https://sb-my-todolist.herokuapp.com/api/v1/user/create";

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
        if (user.message === 'email-already-exists') {
            const emailWarning = document.querySelector('#email-warning');
            emailWarning.textContent = 'E-mail já cadastrado';
        } else {
            alert('Cadastrado com sucesso!\nClique em "OK" para acessar sua conta');
            location.href = 'index.html';
        }
    });
}

const createUserObject = (userName, email, password) => {
    const userObject = Object.create(null);
    userObject.name = userName;
    userObject.email = email;
    userObject.password = password;

    sendUserObject(userObject);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const userName = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    createUserObject(userName, email, password);
});