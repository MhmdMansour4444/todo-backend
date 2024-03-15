function updateTodoItem(taskId, task, taskCheck) {
    const formData = new FormData();
    formData.append('task_id', taskId);
    formData.append('task', task);
    formData.append('task_check', taskCheck);

    fetch('http://localhost:4433/todo-list-backend/todo-backend/edit-todo.php', { 
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.status === 'success') {
            console.log('Todo item updated successfully');
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

updateTodoItem(1, 'Update task description', 1);


function deleteTodoItem(taskId) {
    fetch('http://localhost:4433/todo-list-backend/todo-backend/delete-todo.php', { 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_id: taskId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'Success') {
            console.log('Todo item deleted successfully');
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

deleteTodoItem(1);


function fetchTodoItem(taskId) {
    fetch('http://localhost:4433/todo-list-backend/todo-backend/getTodo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_id: taskId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Task item retrieved successfully');
            console.log('Task ID:', data.todo_item.task_id);
            console.log('Task:', data.todo_item.task);
            console.log('Task Check:', data.todo_item.task_check);
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

fetchTodoItem(1);

function addTodoItem(userId, task, taskCheck) {
    fetch('http://localhost:4433/todo-list-backend/todo-backend/save-todo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            task: task,
            task_check: taskCheck
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

addTodoItem(1, 'Complete task', false);


function submitForm() {
    event.preventDefault();

    let formData = new FormData(document.getElementById('signupForm'));

    fetch('http://localhost:4433/todo-list-backend/todo-backend/signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message);
            window.location.href = '/login.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}