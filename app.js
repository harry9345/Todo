var input = document.getElementById("input");
var add = document.getElementById("add");
var delet = document.getElementById("delet");
var list = document.getElementById("list");

var toDo = [];

function checkLocalStorage() {
  if (localStorage.getItem("AllToDo") === null) {
    console.log("null");
  } else {
    localToDoStorage();
    toDo.map(toDoList);
  }
}

toDo.map(toDoList);

function toDoList(item) {
  var li = document.createElement("li");
  var div = document.createElement("div");
  var removeBtn = document.createElement("button");
  var editBtn = document.createElement("button");
  var span = document.createElement("span");
  removeBtn.innerHTML = "-";
  editBtn.innerHTML = "Edit";
  span.innerText += item;
  div.appendChild(span);
  div.appendChild(removeBtn);
  div.appendChild(editBtn);
  removeBtn.setAttribute("onclick", "removeFromList(this)");
  editBtn.setAttribute("onclick", "editItem(this)");
  li.appendChild(div);
  list.appendChild(li);
}

function removeFromList(e) {
  let toDoValue = e.previousElementSibling.innerHTML;

  const toDoIndex = toDo.indexOf(toDoValue);
  if (toDoIndex > -1) {
    toDo.splice(toDoIndex, 1);
  }
  e.parentElement.parentElement.remove();
  setToDoLocalStorage(toDo);
  console.log(toDo);
}

function editItem(e) {
  let editValue = e.previousElementSibling.previousElementSibling.innerHTML;
  input.value = editValue;
  input.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
      let itemIndx = toDo.indexOf(editValue);
      toDo[itemIndx] = input.value;
      setToDoLocalStorage(toDo);
      rerenderTodo();
    }
  });
}

function rerenderTodo() {
  list.innerHTML = "";
  toDo.map(toDoList);
  input.value = "";
  console.log(toDo);
}

add.addEventListener("click", function () {
  if (input.value !== "") {
    toDo.push(input.value);
    setToDoLocalStorage(toDo);
  } else {
    alert("please insert somthing");
  }
  toDoList(input.value);
  input.value = " ";
});

const setToDoLocalStorage = (toDoItem) => {
  localStorage.setItem("AllToDo", JSON.stringify(toDoItem));
};

delet.addEventListener("click", function () {
  localStorage.clear();
  toDo = [];
  list.innerHTML = "";
});

const localToDoStorage = () => {
  toDo = JSON.parse(localStorage.getItem("AllToDo"));
  console.log(toDo);
  return toDo;
};
