const form = document.querySelector(".js-form"),
    input = form.querySelector("input"), // (eqaul) input = documnet.querSelector("input");
    greeting = document.querySelector(".js-greetings");
    
 const USER_LS = "currentUser", //USER_LOCALSTORGAE
    SHOWING_CN = "showing"; //SHOWING_CLASSNAME-display:block

function paintGreeting(text){
    form.classList.remove(SHOWING_CN); // Remove form
    greeting.classList.add(SHOWING_CN); // add greetings
    greeting.innerText = `Hello ${text}`; // add greeting message
}
function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    // 예를 들어 input의 기본 이벤트는 빈칸에 내용을 적고 enter를 누르면 어딘가로 값이 전달되고 다시 초기화 되는 건데, 이 이벤트를 막고자 할 때 쓰는 것임!(기본 동작을 막는다)
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN); // Reason why add form tags in here : i want to submit user's name form user(we use "form"tags!)
    form.addEventListener("submit",handleSubmit);
}

function LoadName(){
    const currentUser = localStorage.getItem(USER_LS); // localStoreage.getItem() is javascript's func
    if(currentUser === null){
    // she is not here
    askForName();
    }else{
    // she is here
    paintGreeting(currentUser);
    }
}

function init(){
    LoadName();
}
init();

/* 
 event 는 bubble 같은 것이다! form을 제출하는 event가 발생하면
 event 가 document 까지 계속 올라감! 그리고 그 document는 또 다른 곳으로 간다!
*/