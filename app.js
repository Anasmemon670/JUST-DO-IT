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
        border: "none",
        background: "#F7D2Ef",
        // padding: "6px 10px",
        width: "58px",
        height: "32px",
        fontSize: "13px",
        fontFamily: "font-family: Arial, Helvetica, sans-serif",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "15px"
      });

      SaveBtn.addEventListener("mouseover", () => {
        SaveBtn.style.background = "#FFFFFF";
      });
      
      SaveBtn.addEventListener("mouseout", () => {
        SaveBtn.style.background = "#F7D2Ef";
      });

      let CancleBtn = document.createElement("button");
      CancleBtn.textContent = "Cancel";
      Object.assign(CancleBtn.style, {
        // padding: "6px 10px",
        width: "58px",
        height: "32px",
        fontSize: "13px",
        fontFamily: "font-family: Arial, Helvetica, sans-serif",
        textAlign: "center",
        border: "none",
        cursor: "pointer",
        background: "#F7D2Ef",
        borderRadius: "15px"
      });

      CancleBtn.addEventListener("mouseover", () => {
        CancleBtn.style.background = "#FFFFFF";
      });
      
      CancleBtn.addEventListener("mouseout", () => {
        CancleBtn.style.background = "#F7D2Ef";
      });

      EditBtn.style.display = "none";
      deleteBtn.style.display = "none";

      li.insertBefore(EditInput, span);
      li.insertBefore(SaveBtn, buttonContainer);
      li.insertBefore(CancleBtn, buttonContainer);

      function Save() {
        let newtext = EditInput.value.trim();
        if (newtext !== "") {
          span.textContent = newtext;
        }
        Cancle();
      }

      function Cancle() {
        EditInput.remove();
        SaveBtn.remove();
        CancleBtn.remove();
        span.style.display = "inline";
        EditBtn.style.display = "flex";
        deleteBtn.style.display = "flex";
      }

      SaveBtn.addEventListener("click", Save);
      CancleBtn.addEventListener("click", Cancle);

      EditInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          Save();
        } else if (e.key === "Escape") {
          Cancle();
        }
      });

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



