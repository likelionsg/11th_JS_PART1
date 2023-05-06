const form = document.querySelector(".todo__generator"); //class
const todo_list = document.querySelector("#todo__list"); //id
const todo_input = document.querySelector("#todo__input"); //id

let todos = [];

const paintTodo = (value) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = todos.length + 1;

  span.innerHTML = value; //span에 value값 할당함

  li.id = newId;

  const img = document.createElement("img");
  img.src = "./image/delete.png";
  img.className = "todo__delete";

  const data = {
    id: newId,
    value, //value: value와 같음
  };

  todos.push(data);

  li.appendChild(span); //span태그가 li태그의 자식 요소로 들어감
  li.appendChild(img);
  todo_list.appendChild(li);
};

const resetInput = () => {
  todo_input.value = "";
};

const saveTodo = () => {
  localStorage.setItem("todos", JSON.stringify(todos)); //todos 문자열로 만들기
};

const loadTodo = () => {
  const loadedTodos = localStorage.getItem("todos");

  if (loadedTodos === null) return;

  const parsedTodos = JSON.parse(loadedTodos); //문자열을 본인의 타입으로 파싱해주는 메소드
  parsedTodos.forEach((el) => paintTodo(el.value));
};

const makeTodoHandler = (e) => {
  e.preventDefault(); //form 태그의 기본적인 새로고침 방지
  const value = e.target.children[0].value; //value는 사용자가 입력하는 값
  paintTodo(value); //화면에 렌더링
  saveTodo(); //localStorage에 저장
  //DevTools -> Application -> Local Storage에서 확인하기
  resetInput();
};

const deleteHandler = (e) => {
  const targetClass = e.target.className;

  if (targetClass !== "todo__delete") return;
  const parentNode = e.target.parentNode;
  todo_list.removeChild(parentNode);

  const filteredTodos = todos.filter((item) => item.id != parentNode.id); //forEach와 같음. 순회.
  // todos랑 parentNode의 id가 다를 때 todos에 있는 것도 filter(삭제)
  // ==(!=) 와 ===(!==) 의 차이: ===의 경우 type도 같은지 봄
  todos = filteredTodos;
  localStorage.setItem("todos", JSON.stringify(todos));
};

const init = () => {
  loadTodo();
}; // 관행적으로 씀

init();

todo_list.addEventListener("click", deleteHandler);

form.addEventListener("submit", makeTodoHandler);
