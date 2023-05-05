const form=document.querySelector(".todo__generator");
const todo_list=document.querySelector("#todo__list");
const todo_input=document.querySelector("#todo__input");

let todos=[];

const paintTodo=(value)=>{
    const li =document.createElement("li");
    const span = document.createElement("span");
    const newId=todos.length+1;
    const img =document.createElement("img");
    
    
    span.innerHTML=value;
    li.id=newId;
    li.appendChild(span);
    
    const data={
        id:newId,
        value:value,
    };
    todos.push(data);
    img.src="./image/delete.png";
    img.className="todo_delete";
    li.appendChild(img);
    todo_list.appendChild(li);
};
const saveTodo=()=> {
    localStorage.setItem("todos",JSON.stringify(todos));
}
const resetInput=()=>{
    todo_input.value=""

}
const loadTodo= ()=>{
    const loadedtodos= localStorage.getItem("todos");
    if (loadedtodos === null) return;
    const parsedTodos= JSON.parse(loadedtodos)

    parsedTodos.forEach((el)=> paintTodo (el.value));
}

const makeTodoHandler =(e) => {
    e.preventDefault();
    const value=e.target.children[0].value;
    paintTodo(value);
    saveTodo();
    resetInput();
};

const init =() =>{
    loadTodo();
};
const deleteHandler =(e) =>{
    const targetClass =e.target.className;
    if (targetClass !== "todo_delete") return;
    const parentNode = e.target.parentNode;

    todo_list.removeChild(parentNode);
    const filteredTodos= todos.filter((item)=>item.id != parentNode.id);
    todos=filteredTodos;

    localStorage.setItem("todos",JSON.stringify(todos));

};
init();

todo_list.addEventListener("click",deleteHandler);

form.addEventListener("submit",makeTodoHandler);