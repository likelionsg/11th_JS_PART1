const form=document.querySelector(".todo_generator");
const todo_lists=document.querySelector("#todo_lists");
const todo_input=document.querySelector("#todo__input");


let todos=[];

const paintTodo=(value)=>{
    const li=document.createElement("li");
    const span=document.createElement("span");
    const deleteBtn=document.createElement("img");
    
    deleteBtn.src="./image/delete.png";
    deleteBtn.className="todo__delete";
    const newID=todos.length + 1;

    span.innerHTML=value;   
    li.appendChild(span);
    li.appendChild(deleteBtn);

    
    

   
    li.id=newID;
   // console.log(li.id);
    const data={
        id:newID,
        value,
    };
    todos.push(data);
    todo_lists.appendChild(li);
   // console.log(todos);


};

const resetInput=()=>{
    todo_input.value="";
};

const saveTodo=()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
    //array todos를 string으로 변환해야함
};

const loadTodo=()=>{
    const loadedTodos=localStorage.getItem("todos");

    if(loadedTodos==null) return;

    const parsedTodos=JSON.parse(loadedTodos);
    console.log(parsedTodos);
    parsedTodos.forEach((el)=>{
        paintTodo(el.value);
    });

};

const maketodo=(event)=>{
    event.preventDefault();
    
    const value=event.target.children[0].value;
    paintTodo(value);
    saveTodo();
    resetInput();
    

};

const init=()=>{
    
    loadTodo();
};
init();


//iife 즉시실행함수
/*(()=>{
    loadTodo();
})();*/



const deleteHandler=(e)=>{
    const targetClass=e.target.className;
    
    if(targetClass==="todo__delete"){
        const parentNode=e.target.parentNode;
        todo_lists.removeChild(parentNode);

        const filteredTodos=todos.filter((el)=>el.id != parentNode.id);
        todos=filteredTodos;
        saveTodo();

    }
};



todo_lists.addEventListener("click", deleteHandler);
form.addEventListener("submit", maketodo);