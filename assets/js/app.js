/*
                                   // // // // // // // \\                              
                                            //           
                                            //
                                            //  // // // //  // // //      // // // //   
                                            //  //       //  //      \\    //       //
                                            //  //       //  //       \\   //       //
                                            //  //       //  //       ||   //       //
                                            //  //       //  //       //   //       //
                                            //  //       //  //      //    //       //
                                            //  // // // //  // // //      // // // //

*/

/*########################################################################
                             Selectors
#########################################################################*/
let todoInput = document.querySelector(".todo-input ");
let todoList = document.querySelector(".todo-list");
let filter = document.querySelector(".filters");
let completeAllOption = document.querySelector("#mark-all");
let clearCompleted = document.querySelector(".clear-complete-btn");
let regex = /[a-z0-9]/gi;

/*########################################################################
                            Event listeners
#########################################################################*/

document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage);
todoInput.addEventListener("keyup", addTodo);
todoList.addEventListener("click", deleteCheckEdit);
filter.addEventListener("click", filteredResult);
completeAllOption.addEventListener("click", completeAllFilter);
clearCompleted.addEventListener("click", clearAllCompletedFromLocalStorage);

/*########################################################################
                            Functions
#########################################################################*/
countActiveItems();

function addTodo(event) {
  if (event.keyCode === 13) {
    if (regex.test(todoInput.value)) {
      //Creating todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      let id = Date.now().toString().slice(7);
      todoDiv.id = id;

      //Checkbox Button
      const completeButton = document.createElement("input");
      completeButton.setAttribute("type", "checkbox");
      completeButton.classList.add("complete-btn");
      todoDiv.appendChild(completeButton);

      //Todo element
      const newTodo = document.createElement("input");
      newTodo.disabled = true;
      newTodo.classList.add("todo-item");
      newTodo.value = todoInput.value;
      todoDiv.appendChild(newTodo);

      //Add todo to the local storage
      saveTodosInLocalStorage(todoInput.value, id);

      //Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-btn");
      todoDiv.appendChild(editButton);

      //Delete Button
      const deleteButton = document.createElement("button");
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
    removeTodosFromLocalStorage(item.parentElement);
  }

  //Complete btn to mark todo item
  if (item.classList[0] === "complete-btn") {
    const todoItem = item.parentElement;
    todoItem.classList.toggle("completed");
    singleCompletedTodoInLocalStorage(todoItem);
  }

  //Edit btn to update todo item
  if (item.classList[0] === "edit-btn") {
    const todoItem = item.parentElement;
    let editInput = todoItem.childNodes[1];
    editInput.disabled = false;
    editInput.focus();
    let isDone = todoItem.childNodes[0].checked;
    editInput.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (regex.test(editInput.value)) {
          editInput.value = editInput.value;
          editInput.disabled = true;
          editTodoInLocalStorage(todoItem.id, editInput.value, isDone);
        }
      }
    });
  }

  countActiveItems();
}

//Function for all the filters
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
  let isAllChecked = false;
  todoItems.forEach((todo) => {
    if (completeAllOption.checked) {
      todo.childNodes[0].checked = true;
      todo.className = "todo completed";
      isAllChecked = true;
    } else {
      todo.childNodes[0].checked = false;
      todo.className = "todo";
      isAllChecked = false;
    }
  });
  markAllCompletedInLocalStorage(isAllChecked);
  countActiveItems();
}

//Function to count all the active todo
function countActiveItems() {
  let completedItems = document.querySelectorAll(".completed");
  let allItems = document.querySelectorAll(".todo");
  let activeItems = allItems.length - completedItems.length;
  let counter = document.querySelector(".active-todo-counter");

  //Filter display
  filter.style.display = allItems.length > 0 ? "flex" : "none";

  clearCompleted.style.display = completedItems.length > 0 ? "flex" : "none";

  counter.textContent =
    activeItems > 1 ? `${activeItems} items left` : `${activeItems} item left`;
}

/*#####################################################
        Local Storage
######################################################*/

function saveTodosInLocalStorage(todo, id) {
  let todos = checkTodos();
  let data = {
    id: id,
    name: todo,
    isDone: false,
  };
  todos.push(data);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
  let todos = checkTodos();
  for (let todo of todos) {
    //Creating todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = todo.id;

    //Checkbox Button
    const completeButton = document.createElement("input");
    completeButton.setAttribute("type", "checkbox");
    completeButton.classList.add("complete-btn");
    completeButton.checked = todo.isDone;
    todoDiv.appendChild(completeButton);

    //Todo element
    const newTodo = document.createElement("input");
    newTodo.disabled = true;
    newTodo.classList.add("todo-item");
    newTodo.value = todo.name;
    todoDiv.appendChild(newTodo);

    //Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    //Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Appending to the ul todo-list
    const todoList = document.querySelector(".todo-list");

    todoDiv.className = todo.isDone ? "todo  completed" : "todo";
    todoList.appendChild(todoDiv);
  }
  countActiveItems();
}
function removeTodosFromLocalStorage(todo) {
  let todos = checkTodos();
  const todoItem = todo.childNodes[1].value;
  todos.splice(todos.indexOf(todoItem), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editTodoInLocalStorage(id, newTodo, isDone) {
  let todos = checkTodos();
  for (let i in todos) {
    if (todos[i].id === id) {
      todos[i].name = newTodo;
      todos[i].isDone = isDone;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function singleCompletedTodoInLocalStorage(todo) {
  let todos = checkTodos();
  let isDone = todo.childNodes[0].checked;
  for (let i in todos) {
    if (todos[i].id === todo.id) {
      todos[i].isDone = isDone;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function markAllCompletedInLocalStorage(isAllChecked) {
  let todos = checkTodos();
  for (let todo of todos) {
    todo.isDone = isAllChecked;
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Function to clear all the completed todos
function clearAllCompletedFromLocalStorage() {
  let completed = document.querySelectorAll(".completed");
  let length = completed.length;
  let todos = checkTodos();
  while (length > 0) {
    completed[length - 1].remove();
    length--;
    for (let todo of todos) {
      if (todo.isDone) {
        todos.splice(todos.indexOf(todo), 1);
      }
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  countActiveItems();
}

//Get todos from local storage
function checkTodos() {
  let todos =
    localStorage.getItem("todos") !== null
      ? JSON.parse(localStorage.getItem("todos"))
      : [];

  return todos;
}
