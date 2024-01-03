// task.js
import { uniqueId } from './uniqueId.js';
import { ul, input } from './dom.js';

export function inputLength() {
    return input.value.length;
}

export function createListElement(taskText, taskId) {
    let li = document.createElement("li");
    li.id = taskId;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);

    li.appendChild(document.createTextNode(taskText));
    ul.appendChild(li);
    input.value = "";

    function crossOut() {
        li.classList.toggle("done");
        updateLocalStorage();
    }

    li.addEventListener("click", crossOut);

    let deleteBtn = document.createElement("button");
    li.appendChild(deleteBtn);
    deleteBtn.innerHTML = 'X';
    deleteBtn.addEventListener("click", function() {
        deleteListItem(li);
        updateLocalStorage();
    });
}

export function deleteListItem(li) {
    li.classList.add("delete");
    li.remove();
}

export function deleteCompletedTasks() {
    let completedTasks = document.querySelectorAll(".done");

    completedTasks.forEach(function (task) {
        if (task.querySelector("input[type='checkbox']").checked) {
            deleteListItem(task);
        }
    });

    updateLocalStorage();
}

export function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("ul li").forEach(function(task) {
        tasks.push({
            text: task.textContent,
            done: task.classList.contains("done"),
            id: task.id
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

