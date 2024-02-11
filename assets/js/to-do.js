// JavaScript code for To-do apps
//
//
// Array penampung objek-objek to-do item
let todoListArray = [];

// Elemen to-do list (kumpulan to-do item)
const todoList = document.getElementById("to-do-list");

// Fungsi untuk membuat elemen to-do item card yang baru
const createTodoElement = (id, status, title, description) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "to-do-card row");
  wrapper.setAttribute("data-aos", "fade-up");

  const box = document.createElement("div");
  box.setAttribute("class", "icon-box");
  status
    ? (box.style.backgroundColor = "#deffe7")
    : (box.style.backgroundColor = "#ffffff");

  const titleH4 = document.createElement("h4");
  titleH4.setAttribute("class", "title");

  const anchor = document.createElement("a");
  anchor.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.setAttribute("class", "description");
  paragraph.textContent = description;

  const footerCard = document.createElement("div");
  footerCard.setAttribute(
    "class",
    "footer-card d-flex gap-4 justify-content-end"
  );

  const actionDone = document.createElement("span");
  actionDone.setAttribute("class", "action done");
  actionDone.textContent = "✅ ";
  actionDone.addEventListener("click", () => {
    if (status == false) {
      todoListArray[id].todoDone = true;
      localStorage.setItem("todoList", JSON.stringify(todoListArray));
      box.style.backgroundColor = "#deffe7";
      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
      }
      renderTodoList();
    } else {
      todoListArray[id].todoDone = false;
      localStorage.setItem("todoList", JSON.stringify(todoListArray));
      box.style.backgroundColor = "#fff";
      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
      }
      renderTodoList();
    }
  });

  const innerActionDone = document.createElement("span");
  innerActionDone.setAttribute("class", "action-caption");
  status == false
    ? (innerActionDone.textContent = "done")
    : (innerActionDone.textContent = "revert?");

  const actionClear = document.createElement("span");
  actionClear.setAttribute("class", "action clear");
  actionClear.textContent = "❌ ";
  actionClear.addEventListener("click", () => {
    todoListArray.splice(id, 1);
    localStorage.setItem("todoList", JSON.stringify(todoListArray));
    while (todoList.hasChildNodes()) {
      todoList.removeChild(todoList.firstChild);
    }
    renderTodoList();
  });

  const innerActionClear = document.createElement("span");
  innerActionClear.setAttribute("class", "action-caption");
  innerActionClear.textContent = "clear";

  actionDone.appendChild(innerActionDone);
  actionClear.appendChild(innerActionClear);

  footerCard.appendChild(actionDone);
  footerCard.appendChild(actionClear);

  titleH4.appendChild(anchor);

  box.appendChild(titleH4);
  box.appendChild(paragraph);
  box.appendChild(footerCard);

  wrapper.appendChild(box);

  todoList.appendChild(wrapper);
};

// Fungsi untuk melakukan render to-do list
const renderTodoList = () => {
  todoListArray.forEach((element, idx) => {
    createTodoElement(
      idx,
      element.todoDone,
      element.todoTitle,
      element.todoDescription
    );
  });
};

// Cek apakah terdapat data pada Local storage,
// apabila ada maka tampilkan data tersebut dengan fungsi render
let isLocalDataPresent = localStorage.getItem("todoList");
if (isLocalDataPresent !== null) {
  todoListArray = JSON.parse(isLocalDataPresent);
  renderTodoList();
}

// Deklarasi variabel elemen form to-do item input
const todoForm = document.getElementById("to-do-form");

// Validasi untuk mengecek apakah field Title dan Description telah terisi atau belum
// Jika sudah maka jalankan fungsi simpan data
// Namun jika belum maka tidak akan menjalankan apa-apa
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoInputTitle = document.getElementById("to-do-title");
  const todoInputDescription = document.getElementById("to-do-description");
  const todoValue = {
    isDone: false,
    title: todoInputTitle.value,
    description: todoInputDescription.value,
  };
  if (todoValue.title === "" || todoValue.description === "") {
    return;
  }
  saveTodo();
});

// Fungsi untuk menyimpan isi form menjadi data to-do item
const saveTodo = () => {
  const todoInputTitle = document.getElementById("to-do-title").value;
  const todoInputDescription =
    document.getElementById("to-do-description").value;
  const todoObject = {
    todoId: todoListArray.length + 1,
    todoDone: false,
    todoTitle: todoInputTitle,
    todoDescription: todoInputDescription,
  };
  todoListArray.push(todoObject);
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild);
  }
  renderTodoList();
};

// Fungsi untuk menghapus seluruh item pada to-do list
const formatTodos = document.getElementById("format-todos");
formatTodos.addEventListener("click", () => {
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild);
  }
  todoListArray.splice(0, todoListArray.length);
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
});

// Fungsi untuk menghapus seluruh item pada to-do list yang memiliki status Done
const formatTodosDone = document.getElementById("format-todos-done");
formatTodosDone.addEventListener("click", () => {
  todoListArray = todoListArray.filter(function (object) {
    return object.todoDone != true;
  });
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild);
  }
  renderTodoList();
});
