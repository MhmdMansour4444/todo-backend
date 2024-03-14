let todos = [];

const AddToDO = () => {
  const todo = document.getElementById("todoInput").value;
  todos.push({ todoDetials: todo, checked: false });
  fillTodos();
};

const fillTodos = () => {
  console.log(todos);
  let todosDiv = document.getElementById("todosDiv");
  todosDiv.innerHTML = "";
  todos.map((todo, index) => {
    let div = document.createElement("div");
    div.classList.add("d-flex");
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.checked;
    checkBox.onclick = () => {
      if (todo.checked) {
        todo.checked = false;
      } else {
        todo.checked = true;
      }
      fillTodos();
    };
    let h3 = document.createElement("h3");
    let button = document.createElement("button");
    button.id = index;
    button.onclick = () => Delete(index);
    button.innerHTML = "<i class='fa-solid fa-trash'></i>";
    h3.innerHTML = todo.todoDetials;
    div.appendChild(checkBox);
    div.appendChild(h3);
    div.appendChild(button);
    todosDiv.appendChild(div);
  });
  //   console.log(todos);
};

const Delete = (index) => {
  todos.splice(index, 1);
  fillTodos();
};
