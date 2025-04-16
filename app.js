let input = document.getElementById("UserInput");
let UserButton = document.querySelector(".button1");
let ul = document.querySelector("ul");

ul.addEventListener('click', (e) => {
  if (e.target.tagName === "LI") {
    e.target.style.textDecoration = "line-through";
  }
});

UserButton.addEventListener("click", () => {
  addTodo();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  let userText = input.value.trim();
  if (userText !== "") {
    let li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "8px 12px";
    li.style.margin = "5px 0";
    li.style.border = "none";
    li.style.borderRadius = "20px";
    li.style.columnGap = "10px";

    let span = document.createElement("span");
    span.textContent = userText;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteBtn.className = "delete-btn";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "#f8d7da";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.width = "35px";
    deleteBtn.style.height = "35px";
    deleteBtn.style.borderRadius = "50%";
    deleteBtn.style.display = "flex";
    deleteBtn.style.justifyContent = "end";
    deleteBtn.style.alignItems = "center";

    let EditBtn = document.createElement("button");
    EditBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    EditBtn.className = "Edit-btn";
    EditBtn.style.border = "none";
    EditBtn.style.background = "#f8d7da";
    EditBtn.style.cursor = "pointer";
    EditBtn.style.width = "35px";
    EditBtn.style.height = "35px";
    EditBtn.style.borderRadius = "50%";
    EditBtn.style.display = "flex";
    EditBtn.style.justifyContent = "end";
    EditBtn.style.alignItems = "center";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
    });

    // EditBtn.addEventListener("click", (e) => {
    //   e.stopPropagation();
    //   li.edit();
    // });

    li.appendChild(span);
    li.append(EditBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    input.value = "";
  }
}

