const $todo_generator = document.querySelector(".todo_generator");
const $todo_input = $todo_generator.children[0];
const $todoList = document.querySelector("#todoList");

let todo_saver = [];

const init = () => {
  $todo_generator.addEventListener("submit", generateToDo);
  $todoList.addEventListener("click", deleteComponent);

  // Loading Data
  let data = localStorage.getItem("todo");
  if (data === null) return;
  JSON.parse(data).map((el, i) => {
    addToList(el.value);
    addToScreen(el.value);
  });
};

const addToList = (newVal) => {
  let newTodo = {
    id: todo_saver.length + 1,
    value: newVal,
  };
  todo_saver.push(newTodo);
};

const deleteComponent = (e) => {
  if (e.target.className !== "deleteImg") return;

  let $delNode = e.target.parentNode;
  todo_saver = todo_saver.filter((item) => item.id != $delNode.id);
  $todoList.removeChild($delNode);
  saveToDo();
};

const addToScreen = (newVal) => {
  let $newToDo = document.createElement("li");
  $newToDo.id = todo_saver.length;

  let $span = document.createElement("span");
  $span.textContent = newVal;

  let $delImg = document.createElement("img");
  $delImg.src = "./image/delete.png";
  $delImg.className = "deleteImg";

  $newToDo.appendChild($span);
  $newToDo.appendChild($delImg);
  $todoList.appendChild($newToDo);
};

const saveToDo = () => {
  localStorage.setItem("todo", JSON.stringify(todo_saver));
};

const generateToDo = (e) => {
  e.preventDefault();

  let newTodoVal = $todo_input.value;
  $todo_input.value = "";

  addToList(newTodoVal);
  addToScreen(newTodoVal);
  saveToDo();
};

init();
