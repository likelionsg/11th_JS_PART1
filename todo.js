const form = document.querySelector('.todo__generator');
const todo_lists=document.querySelector("#todo__list");
const todo_input=document.querySelector("#todo__input");

let todos=[];

const paintTodo=(value)=>{
    const li=document.createElement("li");
    const span=document.createElement("span");
    const newId=todos.length+1;
    // todos.push(value);

    span.innerHTML=value;
    li.id=newId;

    const img=document.createElement("img");
    img.src="./image/delete.png";
    img.className="todo__delete";

    const data={
        id:newId,
        value,
    }

    li.appendChild(img);
    li.appendChild(span);
    todos.push(data);
    todo_lists.appendChild(li);
};

const resetInput=()=>{
    todo_input.value="";
}

const saveTodo=()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
}

const loadTodo=()=>{
    const loadedTodos=localStorage.getItem("todos");
    if (loadedTodos===null) return;
    const parsedTodos=JSON.parse(loadedTodos);
    parsedTodos.forEach((todo) => {
        paintTodo(todo.value);
    });
}

const makeTodoHandler=(e)=>{
    e.preventDefault();
    const value=e.target.children[0].value;
    paintTodo(value);
    saveTodo();
    resetInput();
};

const deleteHandler=(e)=>{
    const targetClass=e.target.className;
    const parentNode=e.target.parentNode;
    if (targetClass!=="todo__delete") return;
    todo_lists.removeChild(parentNode);

    const filteredTodos=todos.filter((item)=>{
        console.log(item.id,parentNode.id);
        return item.id !=parentNode.id; // 저장된 아이템의 아이디가 지금 선택한 parentNode의 아이디와 다른 경우
    })
    todos=filteredTodos;
    localStorage.setItem("todos",JSON.stringify(todos));
}

const init=()=>{
    loadTodo();
}

init();

todo_lists.addEventListener('click',deleteHandler)
form.addEventListener("submit",makeTodoHandler)