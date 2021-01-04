const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector(".js-toDoForm__input");
const toDoDueDate = toDoForm.querySelector(".js-toDoForm__duedate");
const toDoImportance = toDoForm.querySelector(".js-toDoForm__importance");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo){
    return toDo.id === 1
}

let toDos = [];

//ToDo 지우기
function deleteToDo(event) {
    //HTML에서 ToDo 지우기
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //로컬 스토리지에서 ToDo 지우기
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

//로컬 스토리지에 toDos array 저장
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//리스트에 Todo, Duedate, Importance 추가
function paintToDo(todo, dueDate, importance) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const work = document.createElement("span");
    work.innerText = `To Do : ${todo}`;
    const due = document.createElement("span");
    due.innerText = `Due date : ${dueDate}`;
    const imp = document.createElement("span");
    imp.innerText = `Importance : ${importance}`;
    const newId = toDos.length + 1;
    li.appendChild(delBtn);
    li.appendChild(work);
    li.appendChild(due);
    li.appendChild(imp);
    li.id = newId;
    toDoList.appendChild(li);
    //toDoObj toDos array에 추가
    const toDoObj = {
        work : todo,
        id : newId,
        due : dueDate,
        imp : importance
    };
    toDos.push(toDoObj);
    saveToDos();
}

//입력받은 Todo, Duedate, Importance 전달
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


//로컬스토리지에 저장되어있는 array 불러오기
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        //불러온 array의 값이 전부 string이기 때문에 obj로 다시 변환
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.work, toDo.due, toDo.imp);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();