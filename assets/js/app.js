//Selectors
let todoInput = document.querySelector(".todo-input ");
let todoList = document.querySelector(".todo-list");
let filter = document.querySelector(".filters");
const completeAllOption = document.querySelector("#mark-all");

//Event listeners
todoInput.addEventListener("keyup", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filteredResult);
completeAllOption.addEventListener("click", completeAllFilter);

//Functions
function addTodo(event) {
  if (event.keyCode === 13 || event.which === 13) {
    //Creating todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Checkbox Button
    const completeButton = document.createElement("input");
    completeButton.setAttribute("type", "checkbox");
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //Todo element
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = todoInput.value;
    todoDiv.appendChild(newTodo);

    //Delete Button
    const deleteButton = document.createElement("button");
    // deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Appending to the ul todo-list
    const todoList = document.querySelector(".todo-list");
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

function deleteCheck(event) {
  const item = event.target;
  console.log(event.target);
  if (item.classList[0] === "delete-btn") {
    item.parentElement.remove();
  }

  if (item.classList[0] === "complete-btn") {
    const todoItem = item.parentElement;
    todoItem.classList.toggle("completed");
    // item.style.listStyle = "strike-through";
  }
}

function filteredResult(event) {
  const todoItems = todoList.childNodes;
  todoItems.forEach((todoItem) => {
    switch (event.target.value) {
      case "all":
        todoItem.style.display = "flex";
        break;
      case "completed":
        if (todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
        break;
      case "active":
        if (!todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
        break;
      case "clear":
        if (todoItem.classList.contains("completed")) {
          todoItem.remove();
        } else {
          todoItem.style.display = "none";
        }
        break;
    }
  });
}

function completeAllFilter(event) {
  const todoItems = todoList.childNodes;

  todoItems.forEach((todo) => {
    // if (todo.childNodes[0].checked) {
    //   todo.childNodes[0].checked = false;
    //   todo.classList.toggle("completed");
    // } else {
    todo.childNodes[0].checked = true;
    //   todo.classList.toggle("completed");
    //     todo.classList.toggle("completed");
    // }
    todo.classList.toggle("completed");
  });
  //   todoList.classList.toggle("completed");
}
