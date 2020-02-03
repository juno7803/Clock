const form = document.querySelector(".js-form"),
    input = form.querySelector("input"), // (eqaul) input = documnet.querSelector("input");
    greeting = document.querySelector(".js-greetings");
    
 const USER_LS = "currentUser", //USER_LOCALSTORGAE
    SHOWING_CN = "showing";

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}
function LoadName(){
    const currentUser = localStorage.getItem(USER_LS); // localStoreage.getItem() is javascript's func
    if(currentUser === null){
    // she is not here
    }else{
    // she is here
    paintGreeting(currentUser);
    }
}

function init(){
    LoadName();
}
init();