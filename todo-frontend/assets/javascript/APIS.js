function updateTodoItem(taskId, task, taskCheck) {
    const formData = new FormData();
    formData.append('task_id', taskId);
    formData.append('task', task);
    formData.append('task_check', taskCheck);

    fetch('http://localhost:4433/todo-list-backend/todo-backend/edit-todo', { 
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
    fetch('http://localhost:4433/todo-list-backend/todo-backend/delete-todo', { 
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
    fetch('http://localhost:4433/todo-list-backend/todo-backend/getTodo', {
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
