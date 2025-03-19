const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dueDateInput = document.getElementById("due-date");
const categorySelect = document.getElementById("category");
const badgeDisplay = document.getElementById("badge");

function AddTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        let dueDate = dueDateInput.value;
        li.innerHTML = `${inputBox.value} - <small>${categorySelect.value}</small> - <small>Due: ${dueDate}</small>`;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        checkOverdueTasks();
        updateBadges();
    }
    inputBox.value = "";
    dueDateInput.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        updateBadges();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateBadges();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function checkOverdueTasks() {
    let tasks = listContainer.getElementsByTagName("li");
    let today = new Date().toISOString().split("T")[0];

    for (let task of tasks) {
        let taskText = task.innerHTML;
        let dueDateMatch = taskText.match(/Due: ([0-9\-]+)/);

        if (dueDateMatch) {
            let dueDate = dueDateMatch[1];

            if (dueDate < today) {
                task.classList.add("overdue");
            } else {
                task.classList.remove("overdue");
            }
        }
    }
}

function updateBadges() {
    let completedTasks = document.querySelectorAll(".checked").length;

    if (completedTasks >= 10) {
        badgeDisplay.innerHTML = "🏆 Task Master!";
    } else if (completedTasks >= 5) {
        badgeDisplay.innerHTML = "🥇 Productivity Pro!";
    } else if (completedTasks >= 3) {
        badgeDisplay.innerHTML = "⭐ Keep Going!";
    } else {
        badgeDisplay.innerHTML = "No Badges Yet";
    }
}

showTask();
setInterval(checkOverdueTasks, 60000);
