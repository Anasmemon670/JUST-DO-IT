let input = document.getElementById("UserInput");
let UserButton = document.querySelector(".button1");
let ul = document.querySelector("ul");
let searchInput = document.getElementById("SearchInput");
let searchButton = document.querySelector(".search-button");
let searchBar = document.querySelector(".search-bar");
let form = document.querySelector(".form");
let backButton = document.querySelector(".back-button");
let grayColor = document.querySelector('.gray-theme');
let whiteColor = document.querySelector('.white-theme');
let blackColor = document.querySelector('.black-theme');
let body = document.querySelector('body');
let h1 = document.querySelector("h1");

let currentTheme = "gray";

UserButton.addEventListener("click", () => {
    addTodo();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

searchButton.addEventListener("click", () => {
    if (searchBar && form && searchButton) {
        searchBar.style.display = "flex";
        form.style.display = "none";
        searchButton.style.display = "none";
        if (searchInput) searchInput.focus();
        console.log("Search bar shown");
    }
}
);

backButton.addEventListener("click", () => {
    if (searchBar && form && searchButton && ul) {
        searchBar.style.display = "none";
        form.style.display = "flex";
        searchButton.style.display = "block";
        if (searchInput) searchInput.value = "";
        let tasks = ul.querySelectorAll("li");
        tasks.forEach(task => task.style.display = "flex");
        console.log("Back to form");
    }
});

searchInput.addEventListener("input", () => {
    let filter = searchInput.value.toLowerCase();
    let tasks = ul.querySelectorAll("li");
    tasks.forEach(task => {
        let span = task.querySelector("span");
        if (span) {
            let text = span.textContent.toLowerCase();
            task.style.display = text.includes(filter) ? "flex" : "none";
        }
    });
    console.log("Filtering tasks with: ", filter);
});

function addTodo() {
    if (!input || !ul) return;
    let userText = input.value.trim();
    if (userText !== "") {
        let li = document.createElement("li");
        li.classList.add('items');

        let span = document.createElement("span");
        span.textContent = userText;

        let buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "8px";

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteBtn.classList.add('deleteBtn');

        let editBtn = document.createElement("button");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editBtn.classList.add('EditBtn');

        applyThemeStylesToTodo(li, span, editBtn, deleteBtn);

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            SavedTasksToLocalStorage()
            console.log("Task deleted");
        });

        editBtn.addEventListener("click", () => {
            span.style.display = "none";

            let editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = span.textContent;
            editInput.classList.add('EditInput');

            let saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.classList.add('SaveBtn');

            let cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.classList.add('CancelBtn');

            applyThemeStylesToEdit(editInput, saveBtn, cancelBtn);

            saveBtn.addEventListener("click", () => {
                let newtext = editInput.value.trim();
                if (newtext !== "") {
                    span.textContent = newtext;
                }
                cancelEdit();
                SavedTasksToLocalStorage()

                console.log("Task edited");
            });

            cancelBtn.addEventListener("click", cancelEdit);

            function cancelEdit() {
                editInput.remove();
                saveBtn.remove();
                cancelBtn.remove();
                span.style.display = "inline";
                editBtn.style.display = "flex";
                deleteBtn.style.display = "flex";
                console.log("Edit cancelled");
            }

            editBtn.style.display = "none";
            deleteBtn.style.display = "none";

            li.insertBefore(editInput, span);
            li.insertBefore(saveBtn, buttonContainer);
            li.insertBefore(cancelBtn, buttonContainer);
            editInput.focus();
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonContainer);
        ul.appendChild(li);
        input.value = "";
        console.log("Task added: ", userText);
    }

    SavedTasksToLocalStorage()
}

function SavedTasksToLocalStorage() {
    if (!ul) return;
    let SavedTasks = [];

    ul.querySelectorAll("li").forEach(li => {
        let span = li.querySelector("span");
        if (span) {
            SavedTasks.push(span.textContent);
        };
    });
    localStorage.setItem("TasksSaved", JSON.stringify(SavedTasks));
};

window.addEventListener("DOMContentLoaded", () => {
    let TasksReturns = JSON.parse(localStorage.getItem("TasksSaved")) || [];

    TasksReturns.forEach(tasks => {
        input.value = tasks;
        addTodo()
    });

    let SavedTheme = localStorage.getItem("SelectedTheme");

    if (SavedTheme) {
        currentTheme = SavedTheme;
        applyTheme(currentTheme);
        updateHovers();
    };
});

function applyTheme(theme) {
    if (!body || !h1 || !input || !searchInput || !UserButton || !searchButton || !backButton) return;
    console.log("Applying theme: ", theme);
    if (theme === "gray") {
        body.style.backgroundImage = "linear-gradient(100deg, #575656, #062e3f)";
        h1.style.color = "white";
        input.style.backgroundColor = "#1C191F";
        input.style.color = "white";
        searchInput.style.backgroundColor = "#1C191F";
        searchInput.style.color = "white";
        UserButton.style.backgroundColor = "rgb(247, 226, 223)";
        UserButton.style.color = "black";
        // UserButton.style.boxShadow = "none";
        searchButton.style.backgroundColor = "rgb(247, 226, 223)";
        searchButton.style.color = "black";
        // searchButton.style.boxShadow = "none";
        backButton.style.backgroundColor = "rgb(247, 226, 223)";
        backButton.style.color = "black";
    } else if (theme === "white") {
        body.style.backgroundImage = "linear-gradient(100deg, #d4f1ff, #ffffff)";
        h1.style.color = "black";
        input.style.backgroundColor = "#AEB1B4";
        input.style.color = "#1a150e";
        searchInput.style.backgroundColor = "#AEB1B4";
        searchInput.style.color = "#1a150e";
        UserButton.style.backgroundColor = "white";
        UserButton.style.color = "black";
        UserButton.style.boxShadow = "none";
        searchButton.style.backgroundColor = "white";
        searchButton.style.color = "black";
        searchButton.style.boxShadow = "none";
        backButton.style.backgroundColor = "white";
        backButton.style.color = "black";
    } else if (theme === "black") {
        body.style.backgroundImage = "linear-gradient(100deg, #001214, #001f29)";
        h1.style.color = "white";
        input.style.backgroundColor = "#01394c";
        input.style.color = "#fff";
        searchInput.style.backgroundColor = "#01394c";
        searchInput.style.color = "white";
        UserButton.style.backgroundColor = "#002837";
        UserButton.style.color = "white";
        UserButton.style.boxShadow = "none";
        searchButton.style.backgroundColor = "#002837";
        searchButton.style.color = "white";
        searchButton.style.boxShadow = "none";
        backButton.style.backgroundColor = "#002837";
        backButton.style.color = "white";
        backButton.style.boxShadow = "none"
    }

    if (ul) {
        let tasks = ul.querySelectorAll("li");
        tasks.forEach(task => {
            let span = task.querySelector("span");
            let editBtn = task.querySelector(".EditBtn");
            let deleteBtn = task.querySelector(".deleteBtn");
            if (span && editBtn && deleteBtn) {
                applyThemeStylesToTodo(task, span, editBtn, deleteBtn);
            }
        });
    }
}

function applyThemeStylesToTodo(li, span, editBtn, deleteBtn) {
    if (currentTheme === "gray") {
        li.style.backgroundColor = "#1C191F";
        li.style.color = "white";
        span.style.color = "white";
        editBtn.style.backgroundColor = "rgb(247, 226, 223)";
        editBtn.style.color = "black";
        deleteBtn.style.backgroundColor = "rgb(247, 226, 223)";
        deleteBtn.style.color = "black";
    } else if (currentTheme === "white") {
        li.style.backgroundColor = "rgb(174, 177, 180)";
        li.style.color = "black";
        span.style.color = "black";
        editBtn.style.backgroundColor = "white";
        editBtn.style.color = "black";
        deleteBtn.style.backgroundColor = "white";
        deleteBtn.style.color = "black";
    } else if (currentTheme === "black") {
        li.style.backgroundColor = "rgb(1, 57, 76)";
        li.style.color = "white";
        span.style.color = "white";
        editBtn.style.backgroundColor = "rgb(0, 40, 55)";
        editBtn.style.color = "white";
        deleteBtn.style.backgroundColor = "rgb(0, 40, 55)";
        deleteBtn.style.color = "white";
    }

}

function applyThemeStylesToEdit(editInput, saveBtn, cancelBtn) {
    if (currentTheme === "gray") {
        editInput.style.backgroundColor = "#000";
        editInput.style.color = "white";
        saveBtn.style.backgroundColor = "rgb(247, 226, 223)";
        saveBtn.style.color = "black";
        cancelBtn.style.backgroundColor = "rgb(247, 226, 223)";
        cancelBtn.style.color = "black";
    } else if (currentTheme === "white") {
        editInput.style.backgroundColor = "rgb(145 , 150 , 153)";
        editInput.style.color = "#1a150e";
        saveBtn.style.backgroundColor = "#fff";
        saveBtn.style.color = "black";
        cancelBtn.style.backgroundColor = "#fff";
        cancelBtn.style.color = "black";
    } else if (currentTheme === "black") {
        editInput.style.backgroundColor = "rgb(0 , 31 , 41)";
        editInput.style.color = "white";
        saveBtn.style.backgroundColor = "#002837";
        saveBtn.style.color = "white";
        cancelBtn.style.backgroundColor = "#002837";
        cancelBtn.style.color = "white";

    }
}

function setHover(element, hoverBg, normalBg) {
    element.removeEventListener("mouseover", element._mouseoverHandler);
    element.removeEventListener("mouseout", element._mouseoutHandler);

    element._mouseoverHandler = () => element.style.backgroundColor = hoverBg;
    element._mouseoutHandler = () => element.style.backgroundColor = normalBg;

    element.addEventListener("mouseover", element._mouseoverHandler);
    element.addEventListener("mouseout", element._mouseoutHandler);
}

if (grayColor) {
    grayColor.addEventListener("click", () => {
        currentTheme = "gray";
        applyTheme(currentTheme);
        updateHovers();
        console.log("Switched to gray theme");
        localStorage.setItem("SelectedTheme", currentTheme);
    });
}

if (whiteColor) {
    whiteColor.addEventListener("click", () => {
        currentTheme = "white";
        applyTheme(currentTheme);
        updateHovers();
        console.log("Switched to white theme");
        localStorage.setItem("SelectedTheme", currentTheme);

    });
}

if (blackColor) {
    blackColor.addEventListener("click", () => {
        currentTheme = "black";
        applyTheme(currentTheme);
        updateHovers();
        console.log("Switched to black theme");
        localStorage.setItem("SelectedTheme", currentTheme);
    });
}

function updateHovers() {
    if (!input || !searchInput || !UserButton || !searchButton || !backButton) return;
    if (currentTheme === "gray") {
        setHover(input, "#000", "rgb(24 , 26 , 26)");
        setHover(searchInput, "#000", "rgb(24 , 26 , 26)");
        setHover(UserButton, "white", "rgb(247, 226, 223)");
        setHover(searchButton, "white", "rgb(247, 226, 223)");
        setHover(backButton, "white", "rgb(247, 226, 223)");
    } else if (currentTheme === "white") {
        setHover(input, "#919699", "#AEB1B4");
        setHover(searchInput, "#919699", "#AEB1B4");
        setHover(UserButton, "#f0f0f0", "white");
        setHover(searchButton, "#f0f0f0", "white");
        setHover(backButton, "#f0f0f0", "white");
    } else if (currentTheme === "black") {
        setHover(input, "#013141", "#01394c");
        setHover(searchInput, "#013141", "#01394c");
        setHover(UserButton, "#001f29", "#002837");
        setHover(searchButton, "#001f29", "#002837");
        setHover(backButton, "#001f29", "#002837");
    }
    console.log("Hover effects updated for theme: ", currentTheme);
}

applyTheme(currentTheme);
updateHovers();
