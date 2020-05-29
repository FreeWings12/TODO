//Selectors
let todoInput = document.querySelector(".todo-input ");
let todoList = document.querySelector(".todo-list");
let filter = document.querySelector(".filters");
let completeAllOption = document.querySelector("#mark-all");
let clearCompleted = document.querySelector(".clear-complete-btn");
let regex = /[a-z0-9]/gi;

//Event listeners

todoInput.addEventListener("keyup", addTodo);
todoList.addEventListener("click", deleteCheckEdit);
filter.addEventListener("click", filteredResult);
completeAllOption.addEventListener("click", completeAllFilter);
clearCompleted.addEventListener("click", clearAllCompleted);

//Functions
countActiveItems();

function addTodo(event) {
  if (event.keyCode === 13) {
    if (regex.test(todoInput.value)) {
      //Creating todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //Checkbox Button
      const completeButton = document.createElement("input");
      completeButton.setAttribute("type", "checkbox");
      completeButton.classList.add("complete-btn");
      todoDiv.appendChild(completeButton);

      //Todo element
      // const newTodo = document.createElement("li");
      // newTodo.classList.add("todo-item");
      // newTodo.textContent = todoInput.value;
      // todoDiv.appendChild(newTodo);

      const newTodo = document.createElement("input");
      newTodo.disabled = true;
      newTodo.classList.add("todo-item");
      newTodo.value = todoInput.value;
      todoDiv.appendChild(newTodo);

      //Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-btn");
      todoDiv.appendChild(editButton);

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

function deleteCheckEdit(event) {
  const item = event.target;

  //Delete btn to remove todo item
  if (item.classList[0] === "delete-btn") {
    item.parentElement.remove();
  }

  //Complete btn to mark todo item
  if (item.classList[0] === "complete-btn") {
    const todoItem = item.parentElement;
    todoItem.classList.toggle("completed");
  }

  //Edit btn to update todo item
  if (item.classList[0] === "edit-btn") {
    const todoItem = item.parentElement;
    let editInput = todoItem.childNodes[1];
    editInput.disabled = false;
    editInput.focus();

    editInput.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (regex.test(editInput.value)) {
          editInput.value = editInput.value;
          editInput.disabled = true;
        }
      }
    });
  }

  countActiveItems();
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
  countActiveItems();
}

function updateTodo(event) {
  console.log(event.target); //, event.target);
}
