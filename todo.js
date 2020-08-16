// <⚠️ DONT DELETE THIS ⚠️>

// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pendingArray = [];
let finishedArray = [];

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingArray));
}
function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedArray));
}

function deletePending(event) {
  const li = event.target.parentNode;
  pendingList.removeChild(li);
  pendingArray = pendingArray.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  savePending();
}

function deleteFinished(event) {
  const li = event.target.parentNode;
  finishedList.removeChild(li);
  finishedArray = finishedArray.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  saveFinished();
}

function handleDeletePending(event) {
  deletePending(event);
}
function handleDeleteFinished(event) {
  deleteFinished(event);
}

function penToFin(event) {
  deletePending(event);
  const li = event.target.parentNode;
  const text = li.childNodes[0].innerText;
  paintFinished(text);
}

function finToPen(event) {
  deleteFinished(event);
  const li = event.target.parentNode;
  const text = li.childNodes[0].innerText;
  paintPending(text);
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finishedArray.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", handleDeleteFinished);
  penBtn.innerHTML = "⏮";
  penBtn.addEventListener("click", finToPen);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const taskObj = {
    text: text,
    id: newId,
  };
  finishedArray.push(taskObj);
  saveFinished();
}

function paintPending(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pendingArray.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", handleDeletePending);
  finBtn.innerText = "✅";
  finBtn.addEventListener("click", penToFin);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const taskObj = {
    text: text,
    id: newId,
  };
  pendingArray.push(taskObj);
  savePending();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadList() {
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  const loadedPending = localStorage.getItem(PENDING_LS);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (task) {
      paintFinished(task.text);
    });
  }
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (task) {
      paintPending(task.text);
    });
  }
}

function init() {
  loadList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
