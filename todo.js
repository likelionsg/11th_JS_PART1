// *******************************************************************************************
// *****************************************전역 변수*****************************************
// *******************************************************************************************
const form_tag = document.querySelector("#todo__generator"); // todo__generator id tag
const todo_list = document.querySelector("#todo__list"); // todo__list id tag
const todo_input = document.querySelector("#todo__input"); // todo__input id tag
let memory_todo_list = []; // local memory에 저장할 배열


// *******************************************************************************************
// *****************************************함수 정의*****************************************
// *******************************************************************************************

// *******************************************************************************************
// 1. 초기화
// 1) loadToDo : local storage에 저장한 배열을 가져옴.
const loadToDo = () => {
    const memory_todo_list = localStorage.getItem("memory_todo_list"); // string으로 받음
    if (memory_todo_list === null) return; // 빈 배열이면 종료

    const elm = JSON.parse(memory_todo_list); // string을 배열로 parsing
    elm.forEach((el) => paintToDo(el.value)); // 배열을 돌면서 객체를 하나씩 읽고 화면에 출력
};

// 2) init : loadToDo 함수 실행
const init = () => {
    loadToDo();
};
// *******************************************************************************************

// *******************************************************************************************
// 2. 엔터 키 입력
// 1) paintToDo : 새로운 객체 생성 후 배열에 저장
const paintToDo = (text) => {
    // (1) li_tag
    const li_tag = document.createElement("li"); // span tag 담을 li_tag 생성

    const list_idx = memory_todo_list.length + 1; // 배열 인덱스 1부터 시작
    li_tag.id = list_idx; // li_tag에 id_tag 생성

    const elm = {
        id: list_idx,
        value: text,
    }; // (list_idx, text) 객체 생성
    memory_todo_list.push(elm); // 배열에 객체 추가


    // (2) span_text_tag
    const span_text_tag = document.createElement("span"); // text 담을 span_text_tag 생성
    span_text_tag.innerHTML = text;


    // (3) span_img_tag
    const span_img_tag = document.createElement("span"); // img 담을 span_img_tag 생성

    const up_img = document.createElement("img"); // update_img_tag 생성
    up_img.src = "./image/revision.png";
    up_img.className = "todo__update"; // update_img_tag에 todo__update class 생성

    const del_img = document.createElement("img"); // delete_img_tag 생성
    del_img.src = "./image/delete.png";
    del_img.className = "todo__delete"; // delete_img_tag에 todo__delete class 생성


    // (4) appenChild 함수로 tag 조합
    span_img_tag.appendChild(up_img);
    span_img_tag.appendChild(del_img);

    li_tag.appendChild(span_text_tag);
    li_tag.appendChild(span_img_tag);

    todo_list.appendChild(li_tag);
};

// 2) saveToDo : local storage에 배열 저장
const saveToDo = () => {
    localStorage.setItem("memory_todo_list", JSON.stringify(memory_todo_list)); // string으로 저장
};

// 3) resetInput : 입력 창 빈 문자열로 초기화
const resetInput = () => {
    todo_input.value = "";
};

// 4) submitHandler : enter 키 입력 => input_text 입력 => paintToDo => saveToDo => resetInput
const submitHandler = (event) => {
    event.preventDefault(); // 출력 사라지는 것을 방지
    const input_text = event.target.children[0].value;
    if (input_text === "") return; // 빈 문자열(엔터 키만 입력) 무시

    paintToDo(input_text);
    saveToDo();
    resetInput();
};
// *******************************************************************************************

// *******************************************************************************************
// 3. 마우스 클릭
// 1) updateToDo : target 객체 수정
const updateToDo = (target) => {
    // form_tag 생성
    const form_tag = document.createElement("form");
    form_tag.className = "update__form";

    // input_tag 생성
    const input_tag = document.createElement("input");
    input_tag.type = "text"; // input_tag에 type_tag 생성
    input_tag.style = "color:rgb(7, 68, 7)"; // input_tag에 style_tag 생성
    input_tag.placeholder = "What to do?"; // input_tag에 placeholder_tag 생성
    input_tag.value = target.children[0].innerHTML; // 기존 text 유지

    // form_tag에 input_tag 추가
    form_tag.appendChild(input_tag);

    // target의 text를 form_tag로 replace
    target.replaceChild(form_tag, target.children[0]);


    // ******************updateEnd 함수 정의****************** 
    const updateEnd = (event, target) => {
        event.preventDefault(); // 출력 사라지는 것을 방지

        // !!optional chainig!! : 상위 노드에 접근할 때 존재하지 않아도(undefined) 허용
        if (target.id != event.target?.parentNode?.id) return;

        const span_tag = document.createElement("span"); // span_tag 생성
        const update_text = event.target.children[0].value; // 새로 입력한 text
        span_tag.innerHTML = update_text;

        // 배열을 돌면서 target의 text를 수정
        memory_todo_list.forEach((el) => {
            if (el.id == target.id) {
                console.log(el.span_tag);
                el.span_tag = update_text;
            }
        });

        // target의 text를 새로 입력한 text로 replace
        target.replaceChild(span_tag, target.children[0]);

        // local storage에 변경 내용 저장
        saveToDo();
    };
    // ******************update 함수 정의****************** 

    // 엔터 키 입력 시 updateEnd 함수 실행
    form_tag.addEventListener("submit", (event) => updateEnd(event, target));
};

// 2) deleteToDo : target 객체 삭제
const deleteToDo = (target) => {
    todo_list.removeChild(target);

    // filter : 배열을 돌면서 target과 다른 객체만 가져오겠다. <=> target을 건너뜀 (식별 위해 id로 비교)
    const filtered_todo_list = memory_todo_list.filter((el) => el.id != target.id)
    memory_todo_list = filtered_todo_list; // 필터링한 배열을 배열에 덮어씀

    localStorage.setItem("memory_todo_list", JSON.stringify(memory_todo_list)); // local storage에 다시 저장
};

// clickHandler : 마우스 클릭 => updateToDo or deleteToDo
const clickHandler = (event) => {
    const targetClass = event.target.className;
    const target = event.target.parentNode.parentNode; // li tag

    // updatae img 클릭 시 
    if (targetClass === "todo__update") {
        updateToDo(target);
    }

    // delete img 클릭 시
    else if (targetClass === "todo__delete") {
        deleteToDo(target)
    }
};
// *******************************************************************************************

// *******************************************************************************************
// *****************************************함수 실행*****************************************
// *******************************************************************************************
// 1. 초기화 시 init 함수 실행
init();
// 2. 엔터 키 입력 시 submitHandler 함수 실행
form_tag.addEventListener("submit", submitHandler);
// 3. 마우스 클릭 시 clickHanlder 함수 실행
todo_list.addEventListener("click", clickHandler);