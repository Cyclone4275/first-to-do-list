const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector(".js-toDoForm__input");
const toDoDueDate = toDoForm.querySelector(".js-toDoForm__duedate");
const toDoImportance = toDoForm.querySelector(".js-toDoForm__importance");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function paintToDo(text, dueDate, importance) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    const span = document.createElement("span");
    span.innerText = `To Do : ${text}`;
    const due = document.createElement("span");
    due.innerText = dueDate;
    const imp = document.createElement("span");
    imp.innerText = importance;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(due);
    li.appendChild(imp);
    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    const currentDueDate = toDoDueDate.value;
    const currentImportance = toDoImportance.value;
    paintToDo(currentValue, currentDueDate, currentImportance);
    toDoInput.value = "";
    toDoDueDate.value = "";
    toDoImportance.value = "";
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null) {

    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();