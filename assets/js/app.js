//Selectors
let todoInput = document.querySelector(".todo-input ");
let todoList = document.querySelector(".todo-list");
let filter = document.querySelector(".filters");
const completeAllOption = document.querySelector("#mark-all");
const clearCompleted = document.querySelector(".clear-complete-btn");
let regex = /[a-z0-9]/gi;

//Event listeners

todoInput.addEventListener("keyup", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filteredResult);
completeAllOption.addEventListener("click", completeAllFilter);
clearCompleted.addEventListener("click", clearAllCompleted);

//Functions

function addTodo(event) {
  if (event.keyCode === 13 || event.which === 13) {
    if (todoInput.value.length > 0 && regex.test(todoInput.value)) {
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
    countActiveItems();
  }
}

function deleteCheck(event) {
  const item = event.target;

  //Delete btn to remove todo item
  console.log(event.target);
  if (item.classList[0] === "delete-btn") {
    item.parentElement.remove();
    countActiveItems();
  }

  //Complete btn to mark todo item
  if (item.classList[0] === "complete-btn") {
    const todoItem = item.parentElement;
    todoItem.classList.toggle("completed");
    // item.style = "line-through";
    countActiveItems();
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
    console.log(todo);
    // todo..classList("complete-btn").checked = true;
    //   todo.classList.toggle("completed");
    // }
    todo.classList.toggle("completed");
  });
  //   todoList.classList.toggle("completed");
}

//Function to count all the active todo
function countActiveItems() {
  let activeItems = document.querySelectorAll(".completed");
  let allItems = document.querySelectorAll(".todo");
  let result = allItems.length - activeItems.length;
  let counter = document.querySelector(".active-todo-counter");
  counter.textContent =
    result > 1 ? `${result} items left` : `${result} item left`;
}

//Function to clear all the completed todo
function clearAllCompleted() {
  let completed = document.querySelectorAll(".completed");
  let length = completed.length;
  while (length > 0) {
    completed[length - 1].remove();
    length--;
  }
}
