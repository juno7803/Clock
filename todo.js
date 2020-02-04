const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList =document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; // LOCALSTROAGE
// localstorage does not disappear when the page refreshed.

let toDos = [];

function delteToDo(event){
    const btn = event.target; // event(여기선 "click"한)의 target
    const li = btn.parentNode; // btn의 id 값을 알기 위해 추적
    toDoList.removeChild(li);
    // 여기까지해도 지워지지만, 새로고침하면 저장이 되지 않는다.
    const CleanToDos = toDos.filter(function(todo){
        return todo.id !== parseInt(li.id); // li의 id 값은 string이므로 int로 parse 해주는 parseInt()사용
    });
    // fliter함수는 조건을 true 시키는 값들로 배열을 새로 만들어서 리턴함!
    // toDos 배열의 원소들의 id값과 삭제한 li의 id값이 다른것이 있다면 (남아있는 것이라는 뜻) 그것을 모두 리턴하여
    // 저장하겠다는 뜻임(<=> 삭제하고 남은 아이템들만 리턴하겠다)
    toDos = CleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    // javascript는 ls에 string으로만 저장하려 하기때문에 객체도 그저 object로만 표기된다.
    // 이 문제점을 해결하기 위한 코드가 JSON.stringify 이다 - javascript object를 string으로 바꿔준다

}

function paintToDo(text){
    const list = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="❌";
    delBtn.addEventListener("click",delteToDo);
    const span =document.createElement("span");
    const newId = toDos.length+1;
    // span : 문자열 선택 지정(원하는 만큼)
    // div : 비교적 넓은 범위를 묶어 지정
    span.innerText = text;
    list.appendChild(span);
    list.appendChild(delBtn);
    list.id = newId;
    toDoList.appendChild(list);
    // appendChild : 새로운 단락 요소를 생성하고 문서에 있는 toDoList 요소의 끝에 붙입니다.
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    // localStorage의 key값이 TODOS_LS인 value를 가져온다
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(todo){
            paintToDo(todo.text);
        });
        // loadedToDos는 string이므로 다시 parse 해준다
        // forEach() 함수는 배열에 사용하고, 배열 각각의 원소마다 함수를 실행시켜주는 역할을 한다.
        // 여기선 paintedToDo를 매번 실행해준다.
    }
}
// JSON : 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능
function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();