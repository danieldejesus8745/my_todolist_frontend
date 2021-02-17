if (!sessionStorage.getItem('userEmail')) {
    location.href = '../index.html';
}

const userName = document.querySelector('#user-name');
userName.textContent = sessionStorage.getItem('userName');

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();

    sessionStorage.clear();

    location.href = 'panel.html';
});