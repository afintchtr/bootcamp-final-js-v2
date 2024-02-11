let todoListArray = [];
const todoList = document.getElementById("to-do-list");

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
    const todoCardList = document.getElementById("to-do-list");
    if (status == false) {
      todoListArray[id].todoDone = true;
      localStorage.setItem("todoList", JSON.stringify(todoListArray));
      box.style.backgroundColor = "#deffe7";
      while (todoCardList.hasChildNodes()) {
        todoCardList.removeChild(todoCardList.firstChild);
      }
      renderTodoList();
    } else {
      todoListArray[id].todoDone = false;
      localStorage.setItem("todoList", JSON.stringify(todoListArray));
      box.style.backgroundColor = "#fff";
      while (todoCardList.hasChildNodes()) {
        todoCardList.removeChild(todoCardList.firstChild);
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
    const todoCardList = document.getElementById("to-do-list");
    todoListArray.splice(id, 1);
    localStorage.setItem("todoList", JSON.stringify(todoListArray));
    while (todoCardList.hasChildNodes()) {
      todoCardList.removeChild(todoCardList.firstChild);
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

const renderTodoList = () => {
  todoListArray.forEach((element, idx) => {
    createTodoElement(
      idx,
      element.todoDone,
      element.todoTitle,
      element.todoDescription
    );
  });

  for (let idx = 0; idx < todoListArray.length; idx++) {}
};

let isLocalDataPresent = localStorage.getItem("todoList");
if (isLocalDataPresent !== null) {
  todoListArray = JSON.parse(isLocalDataPresent);
  renderTodoList();
}

const todoForm = document.getElementById("to-do-form");
const todoInputTitle = document.getElementById("to-do-title");
const todoInputDescription = document.getElementById("to-do-description");

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
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

const saveTodo = () => {
  const todoInputTitle = document.getElementById("to-do-title").value;
  const todoInputDescription =
    document.getElementById("to-do-description").value;
  const todoCardList = document.getElementById("to-do-list");

  const todoObject = {
    todoId: todoListArray.length + 1,
    todoDone: false,
    todoTitle: todoInputTitle,
    todoDescription: todoInputDescription,
  };

  todoListArray.push(todoObject);
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
  while (todoCardList.hasChildNodes()) {
    todoCardList.removeChild(todoCardList.firstChild);
  }
  renderTodoList();
};

const formatTodos = document.getElementById("format-todos");
formatTodos.addEventListener("click", () => {
  const todoCardList = document.getElementById("to-do-list");

  while (todoCardList.hasChildNodes()) {
    todoCardList.removeChild(todoCardList.firstChild);
  }

  todoListArray.splice(0, todoListArray.length);
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
});

const formatTodosDone = document.getElementById("format-todos-done");
formatTodosDone.addEventListener("click", () => {
  const todoCardList = document.getElementById("to-do-list");

  todoListArray = todoListArray.filter(function (object) {
    return object.todoDone != true;
  });
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
  while (todoCardList.hasChildNodes()) {
    todoCardList.removeChild(todoCardList.firstChild);
  }
  renderTodoList();
});
