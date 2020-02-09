const todoForm = document.querySelector(".js-toDoForm");
const todoText = document.getElementById("todoText");
const pendingList = document.querySelector(".pending");
const finishedList = document.querySelector(".finished");
let arrayPending = [];
let arrayFinish = [];
const PENDING = "PENDING";
const FINISH = "FINISH";

function textSubmit(event) {
  event.preventDefault();
  const value = todoText.value;
  const newId = new Date().valueOf();
  insertObj(newId, value, PENDING, arrayPending);
  appendList(pendingList, value, createBtn("✅"), newId);
  todoText.value = "";
}

function insertObj(id, text, key, array) {
  const todoObj = {
    id: id,
    text: text
  };
  array.push(todoObj);
  localStorage.setItem(key, JSON.stringify(array));
}

function movetoLi(event) {
  console.log("move call");
  const btn = event.target;
  const li = btn.parentNode;
  const ui = li.parentNode;
  const text = li.querySelector("span").innerText;
  if (ui.className === "finished") {
    btn.innerText = "✅";
    finishedList.removeChild(li);
    pendingList.appendChild(li);
    deleteLocationStorage(FINISH, li);
    insertObj(li.id, text, PENDING, arrayPending);
  } else {
    btn.innerText = "⏪";
    pendingList.removeChild(li);
    finishedList.appendChild(li);
    deleteLocationStorage(PENDING, li);
    insertObj(li.id, text, FINISH, arrayFinish);
  }
}

function deleteLocationStorage(key, li) {
  const array = key === PENDING ? arrayPending : arrayFinish;
  const cleanTodos = array.filter(function(todo) {
    return todo.id != parseInt(li.id);
  });
  if (key === PENDING) {
    arrayPending = cleanTodos;
    localStorage.setItem(key, JSON.stringify(arrayPending));
  } else {
    arrayFinish = cleanTodos;
    localStorage.setItem(key, JSON.stringify(arrayFinish));
  }
}

function deleteClick(event) {
  console.log("delete call");
  const btn = event.target;
  const li = btn.parentNode;
  const ui = li.parentNode;
  if (ui.className === "pending") {
    deleteLocationStorage(PENDING, li);
  } else {
    deleteLocationStorage(FINISH, li);
  }
  ui.removeChild(li);
}

function loadPage() {
  const pending = localStorage.getItem(PENDING);
  const finished = localStorage.getItem(FINISH);
  if (pending !== null) {
    drawTodos(pending, "✅", pendingList);
  }
  if (finished !== null) {
    drawTodos(finished, "⏪", finishedList);
  }
}
function drawTodos(todoList, imoge, list) {
  const todos = JSON.parse(todoList);
  todos.forEach(function(toDoItem) {
    const text = toDoItem.text;
    const btn = createBtn(imoge);
    const id = toDoItem.id;
    if (imoge === "✅") {
      insertObj(id, text, PENDING, arrayPending);
    } else {
      insertObj(id, text, FINISH, arrayFinish);
    }
    appendList(list, text, btn, id);
  });
}

function createBtn(text) {
  const btn = document.createElement("button");
  text === "❌"
    ? btn.addEventListener("click", deleteClick)
    : btn.addEventListener("click", movetoLi);
  btn.innerText = text;
  return btn;
}

function appendList(list, text, btn, id) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = createBtn("❌");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(btn);
  li.id = id;
  list.appendChild(li);
}
loadPage();
todoForm.addEventListener("submit", textSubmit);
