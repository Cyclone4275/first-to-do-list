const form = document.querySelector(".js-form");
const input = document.querySelector(".js-form__input");
const greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser";
const SHOWING_CN = "showing"

//로컬 스토리지에 입력 받은 이름을 저장하기 위한 함수
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

//저장한 이름을 가져오고, 저장된 이름을 가지고 paintGreeting 함수를 호출하는 함수
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

//유저가 없을 경우 실행하는 함수
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

//입력받은 이름을 불러와서 인삿말을 출력하는 함수
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;

}

//로컬 스토리지에 저장된 이름을 가져오는 함수
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        // 유저가 없는 경우
        askForName();
    } else {
        // 유저가 있는 경우
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();