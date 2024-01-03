// script.js
import { enterButton, input, deleteButton } from './dom.js';
import { uniqueId } from './uniqueId.js';
import { createListElement, updateLocalStorage, deleteCompletedTasks, inputLength } from './task.js';


function addListAfterClick() {
    if (inputLength() > 0) {
        let taskId = uniqueId();
        createListElement(input.value, taskId);
        updateLocalStorage();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
        createListElement(input.value);
        updateLocalStorage();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let tasksArray = JSON.parse(savedTasks);
        tasksArray.forEach(function(task) {
            createListElement(task.text, task.id);
            if (task.done) {
                let lastLi = ul.lastChild;
                lastLi.classList.add("done");
                lastLi.querySelector("input[type='checkbox']").checked = true;
            }
        });
    }
});

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
deleteButton.addEventListener("click", deleteCompletedTasks);

