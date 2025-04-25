let input = document.getElementById("UserInput");
let UserButton = document.querySelector(".button1");
let ul = document.querySelector("ul");
let searchInput = document.getElementById("SearchInput");
let searchToggle = document.querySelector(".search-toggle");
let searchBar = document.querySelector(".search-bar");
let form = document.querySelector(".form");
let backButton = document.querySelector(".back-button");

UserButton.addEventListener("click", () => {
  addTodo();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

searchToggle.addEventListener("click", () => {
  searchBar.style.display = "flex";
  form.style.display = "none";
  searchToggle.style.display = "none";
  searchInput.focus();
});

backButton.addEventListener("click", () => {
  searchBar.style.display = "none";
  form.style.display = "flex";
  searchToggle.style.display = "block";
  searchInput.value = "";
  let tasks = ul.querySelectorAll("li");
  tasks.forEach(task => {
    task.style.display = "flex";
  });
});

searchInput.addEventListener("input", () => {
  let filter = searchInput.value.toLowerCase();
  let tasks = ul.querySelectorAll("li");
  tasks.forEach(task => {
    let text = task.querySelector("span").textContent.toLowerCase();
    task.style.display = text.includes(filter) ? "flex" : "none";
  });
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
    li.style.borderRadius = "20px";
    li.style.columnGap = "7px";

    let span = document.createElement("span");
    span.textContent = userText;

    let buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "8px";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    Object.assign(deleteBtn.style, {
      border: "none",
      background: "#f8d7da",
      cursor: "pointer",
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    });

    let EditBtn = document.createElement("button");
    EditBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    Object.assign(EditBtn.style, {
      border: "none",
      background: "#f8d7da",
      cursor: "pointer",
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    });

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
    });

    EditBtn.addEventListener("click", () => {
      span.style.display = "none";

      let EditInput = document.createElement("input");
      EditInput.type = "text";
      EditInput.value = span.textContent;

      Object.assign(EditInput.style, {
        flex: "1",
        padding: "5px",
        marginRight: "5px",
        border: "none",
        outline: "none",
        borderRadius: "10px"
      });

      let SaveBtn = document.createElement("button");
      SaveBtn.textContent = "Save";
      Object.assign(SaveBtn.style, {
        width: "58px",
        height: "32px",
        fontSize: "13px",
        background: "#F7D2Ef",
        borderRadius: "15px"
      });

      SaveBtn.addEventListener("click", () => {
        let newtext = EditInput.value.trim();
        if (newtext !== "") {
          span.textContent = newtext;
        }
        cancelEdit();
      });

      let CancleBtn = document.createElement("button");
      CancleBtn.textContent = "Cancel";
      Object.assign(CancleBtn.style, {
        width: "58px",
        height: "32px",
        fontSize: "13px",
        background: "#F7D2Ef",
        borderRadius: "15px"
      });

      CancleBtn.addEventListener("click", cancelEdit);

      function cancelEdit() {
        EditInput.remove();
        SaveBtn.remove();
        CancleBtn.remove();
        span.style.display = "inline";
        EditBtn.style.display = "flex";
        deleteBtn.style.display = "flex";
      }

      EditBtn.style.display = "none";
      deleteBtn.style.display = "none";

      li.insertBefore(EditInput, span);
      li.insertBefore(SaveBtn, buttonContainer);
      li.insertBefore(CancleBtn, buttonContainer);

      EditInput.focus();
    });

    buttonContainer.appendChild(EditBtn);
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonContainer);
    ul.appendChild(li);
    input.value = "";
  }
}

let grayColor = document.querySelector('.gray-theme');
let whiteColor = document.querySelector('.white-theme');
let blackColor = document.querySelector('.black-theme');
let body = document.querySelector('body');
let h2 = document.querySelector("h2");

grayColor.addEventListener("click", () => {
  body.style.backgroundImage = "linear-gradient(100deg, #575656, #062e3f)";
  h2.style.color = "white";
});

whiteColor.addEventListener("click", () => {
  body.style.backgroundImage = "linear-gradient(100deg, #d4f1ff, #ffffff)";
  h2.style.color = "darkslategray";
});

blackColor.addEventListener("click", () => {
  body.style.backgroundImage = "linear-gradient(100deg, #001214, #001f29)";
  h2.style.color = "white";
});


