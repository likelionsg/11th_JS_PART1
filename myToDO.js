const $todo_generator = document.querySelector(".todo_generator");
const $todo_input = $todo_generator.children[0];
const $todoList = document.querySelector("#todoList");

let todo_saver = [];

const init = () => {
  $todo_generator.addEventListener("submit", generateToDo);
  $todoList.addEventListener("click", deleteUpdateHandler);

  // Loading Data
  let data = localStorage.getItem("todo");
  if (data === null) return;
  JSON.parse(data).map((el, i) => {
    addToList(el.value);
    addToScreen(el.value);
  });
};

const deleteUpdateHandler = (e) => {
  e.preventDefault();
  if (e.target.className === "deleteImg") {
    deleteComponent(e);
  } else if (e.target.className === "setImg") {
    updateComponent(e);
  }
};

const addToList = (newVal) => {
  let newTodo = {
    id: todo_saver.length + 1,
    value: newVal,
  };
  todo_saver.push(newTodo);
};

const updateComponent = (e) => {
  let $updateNode = e.target.parentNode;

  $reviseForm = document.createElement("form");
  $reviseInput = document.createElement("input");
  $reviseInput.value = $updateNode.firstChild.textContent;
  $reviseForm.appendChild($reviseInput);
  $reviseForm.addEventListener("submit", reviseToDo);

  $updateNode.replaceChild($reviseForm, $updateNode.firstChild);
};

const reviseToDo = (e) => {
  e.preventDefault();
  let $updateToDo = e.target.parentNode;

  // revise screen
  let newVal = e.target.children[0].value;
  let $span = document.createElement("span");
  $span.textContent = newVal;
  $updateToDo.replaceChild($span, e.target);

  // revise data
  console.log($updateToDo.id);
  todo_saver.map((el, i) => {
    console.log(el.id);
    if ($updateToDo.id == el.id) {
      el.value = newVal;
    }
  });
  saveToDo();
};

const deleteComponent = (e) => {
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

  let $setImg = document.createElement("img");
  $setImg.src = "./image/revision.png";
  $setImg.className = "setImg";

  $newToDo.appendChild($span);
  $newToDo.appendChild($delImg);
  $newToDo.appendChild($setImg);
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
