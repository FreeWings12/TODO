//Selectors
let todoInput = document.querySelector(".todo-input ");
let todoList = document.querySelector(".todo-list");
let filter = document.querySelector(".filters");
let completeAllOption = document.querySelector("#mark-all");
let clearCompleted = document.querySelector(".clear-complete-btn");
let regex = /[a-z0-9]/gi;
let todoItem = "";

//Event listeners

todoInput.addEventListener("keyup", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filteredResult);
completeAllOption.addEventListener("click", completeAllFilter);
clearCompleted.addEventListener("click", clearAllCompleted);
// console.log(todoItem);

if (todoItem) {
  console.log(todoItem);
  // todoItem.addEventListener("dblclick", updateTodo);
}

//Functions
countActiveItems();

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

      // const newTodo = document.createElement("input");
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

      todoItem = document.querySelector(".todo-item");
    }
    countActiveItems();
  }
}

function deleteCheck(event) {
  const item = event.target;

  //Delete btn to remove todo item
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

//Function to mark / unmark all todo as complete or incomplete
function completeAllFilter(event) {
  const todoItems = todoList.childNodes;

  todoItems.forEach((todo) => {
    if (completeAllOption.checked) {
      todo.childNodes[0].checked = true;
      todo.className = "todo completed";
    } else {
      todo.childNodes[0].checked = false;
      todo.className = "todo";
    }
  });
  countActiveItems();
}

//Function to count all the active todo
function countActiveItems() {
  let completedItems = document.querySelectorAll(".completed");
  let allItems = document.querySelectorAll(".todo");
  let activeItems = allItems.length - completedItems.length;
  let counter = document.querySelector(".active-todo-counter");

  clearCompleted.style.display = completedItems.length > 0 ? "flex" : "none";
  counter.textContent =
    activeItems > 1 ? `${activeItems} items left` : `${activeItems} item left`;
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

function updateTodo(event) {
  console.log("hello"); //, event.target);
}
