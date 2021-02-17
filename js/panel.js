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

const form = document.querySelector('#form');

const deleteTask = taskId => {
    const url = `https://sb-my-todolist.herokuapp.com/api/v1/task/delete/${taskId}`;

    fetch (url, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(task => {
        getTasks();
    });
}

const loadTasks = (tasksDiv, tasks) => {
    tasks.forEach(task => {
        const divElement = document.createElement('div');
        const pElement = document.createElement('p');
        const inDivElement = document.createElement('div');
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', '../img/todolist_logo.png');
        imgElement.setAttribute('alt', 'done.png');
        inDivElement.append(imgElement);
        inDivElement.setAttribute('onclick', `deleteTask(${task.id})`);
        pElement.textContent = task.task;
        divElement.appendChild(pElement);
        divElement.appendChild(inDivElement);
        divElement.classList.add('task');
        tasksDiv.append(divElement);
    });
}

const getTasks = () => {
    const url = `https://sb-my-todolist.herokuapp.com/api/v1/task/read/${sessionStorage.getItem('userEmail')}`;

    fetch (url, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'GET'
    })
    .then(response => response.json())
    .then(tasks => {
        const tasksDiv = document.querySelector('#tasks');
        tasksDiv.textContent = '';
        loadTasks(tasksDiv, tasks);
    });
}

const sendTaskObject = taskObject => {
    const url = "https://sb-my-todolist.herokuapp.com/api/v1/task/create";

    fetch (url, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(taskObject)
    })
    .then(response => response.json())
    .then(user => {
        const taskInput = document.querySelector('#task');
        taskInput.value = '';
        getTasks();
    });
}

const createTaskObject = (task, owner) => {
    const taskObject = Object.create(null);
    taskObject.task = task;
    taskObject.owner = owner;

    sendTaskObject(taskObject);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const task = document.querySelector('#task').value;
    const owner = sessionStorage.getItem('userEmail');

    createTaskObject(task, owner);
});

getTasks();