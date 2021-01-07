const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector(".js-toDoForm__input");
const toDoDueDate = toDoForm.querySelector(".js-toDoForm__duedate");
const toDoImportance = toDoForm.querySelector(".js-toDoForm__importance");
const toDoList = document.querySelector(".js-toDoList");
const sortByDueBtn = document.querySelector("#js-toDoForm__sortbydue");
const sortByImpBtn = document.querySelector("#js-toDoForm__sortbyimp");
let toDos = [];

const TODOS_LS = "toDos";

function sortToDoByImp() {
  toDos.sort((a, b) => (a.imp < b.imp ? -1 : a.imp > b.imp ? 1 : 0));
  saveToDos();
  toDoList.innerHTML = "";
  loadToDos();
}

function sortToDoByDue() {
  toDos.sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0));
  saveToDos();
  toDoList.innerHTML = "";
  loadToDos();
}

function filterFn(toDo) {
  return toDo.id === 1;
}

//ToDo 지우기
function deleteToDo(event) {
  //HTML에서 ToDo 지우기
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //로컬 스토리지에서 ToDo 지우기
  const cleanToDos = toDos.filter(function (toDo) {
    console.log(toDo.id);
    console.log(li.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//로컬 스토리지에 toDos array 저장
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function createToDo(toDo) {
  toDos.push(toDo);
  saveToDos();
}

//리스트에 Todo, Duedate, Importance 추가
function paintToDo(toDo) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const work = document.createElement("span");
  work.innerText = `To Do : ${toDo.work}`;
  const due = document.createElement("span");
  due.innerText = `Due date : ${toDo.due}`;
  const imp = document.createElement("span");
  imp.innerText = `Importance : ${toDo.imp}`;
  const newId = toDo.id;
  li.appendChild(delBtn);
  li.appendChild(work);
  li.appendChild(due);
  li.appendChild(imp);
  li.id = newId;
  toDoList.appendChild(li);
}

//입력받은 Todo, Duedate, Importance 전달
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const currentDueDate = toDoDueDate.value;
  const currentImportance = toDoImportance.value;
  const toDo = {
    work: currentValue,
    id: toDos.length + 1,
    due: currentDueDate,
    imp: currentImportance,
  };
  createToDo(toDo);
  paintToDo(toDo);
  toDoInput.value = "";
  toDoDueDate.value = "";
  toDoImportance.value = "";
}

//로컬스토리지에 저장되어있는 array 불러오기
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //불러온 array의 값이 전부 string이기 때문에 obj로 다시 변환
    toDos = JSON.parse(loadedToDos);
    toDos.forEach(function (toDo) {
      paintToDo(toDo);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  sortByDueBtn.addEventListener("click", sortToDoByDue);
  sortByImpBtn.addEventListener("click", sortToDoByImp);
}

init();
