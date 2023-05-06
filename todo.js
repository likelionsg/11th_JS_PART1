const form = document.querySelector(".todo_generator");
const todo_lists = document.querySelector(".todo_lists");
let todos = [];

console.log(form);
console.log(todo_lists);

const saveTodo = () => {
  localStorage.setItem("todos", JSON.stringify(todos)); // 문자열로 변환해서 저장
};

const resetInputText = () => {
  const todo_input = document.querySelector(".todo_input");
  todo_input.value = "";
};

const loadTodo = () => {
  const loadedTodos = localStorage.getItem("todos");

  if (loadedTodos === null) return;

  const parsedTodos = JSON.parse(loadedTodos); // 문자열로 변환했기 때문에 다시 파싱해줌
  console.log(parsedTodos);
  parsedTodos.forEach((todo) => {
    paintTodo(todo.text);
  });
};

const paintTodo = (text) => {
  const li = document.createElement("li");
  const span = document.createElement("span");

  span.innerHTML = text;
  li.appendChild(span);

  const reviseBtn = document.createElement("img");
  reviseBtn.src = "./image/revision.png";
  reviseBtn.className = "todo_revise";
  li.appendChild(reviseBtn);

  const deleteBtn = document.createElement("img");
  deleteBtn.src = "./image/delete.png";
  deleteBtn.className = "todo_delete";
  li.appendChild(deleteBtn); // delete 버튼 추가

  const newId = todos.length;
  li.id = newId;

  const data = {
    id: newId,
    text,
  };

  todos.push(data);

  todo_lists.appendChild(li);
};

const makeTodoHandler = (event) => {
  event.preventDefault();
  const value = event.target.children[0].value;
  paintTodo(value);
  saveTodo();
  resetInputText();
};

// 페이지 로드될 때 locat storage data read 하는 함수
const init = () => {
  loadTodo();
};

init();

form.addEventListener("submit", makeTodoHandler);

const deleteTodo = (target) => {
  todo_lists.removeChild(target);

  const renewedTodos = todos.filter((e) => {
    return e.id != target.id; // 숫자 / 문자열 이기 때문에 != 으로 해야 정상적으로 작동
  });
  todos = renewedTodos;
  saveTodo();
};

const reviseTodo = (target) => {
  const form = document.createElement("form");
  const input = document.createElement("input");

  input.type = "text";
  form.className = "revise_form";

  const value = target.children[0].innerHTML;
  input.value = value;

  form.appendChild(input);

  target.replaceChild(form, target.children[0]); // 새롭게 만든 걸로 교체

  const reviseEnd = (event, target) => {
    event.preventDefault();

    if (target.id != event.target?.parentNode?.id) return;

    const text = document.createElement("span");
    const revisedText = event.target.children[0].value;
    text.innerHTML = revisedText;

    todos.forEach((e) => {
      if (e.id === target.id) {
        e.text = revisedText;
      }
    });

    target.replaceChild(text, target.children[0]);

    saveTodo();
  };

  form.addEventListener("submit", (e) => reviseEnd(e, target));
};

const deleteHandler = (event) => {
  const type = event.target.className; // img 버튼 눌렀을 때만 삭제
  const target = event.target.parentNode; // img의 부모 태그를 가져옴

  if (type === "todo_delete") {
    deleteTodo(target);
  } else if (type === "todo_revise") {
    reviseTodo(target);
  }
};

todo_lists.addEventListener("click", deleteHandler);
