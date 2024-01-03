// Fonction pour générer un identifiant unique
function uniqueId() {
    return Date.now().toString(16) + Math.floor(Math.random() * 1000).toString(16);
}

// Sélection des éléments du DOM
let enterButton = document.getElementById("addTask");
let input = document.getElementById("newTask");
let ul = document.querySelector("ul");
let deleteButton = document.getElementById("delete");

// Fonction pour vérifier la longueur de la valeur dans le champ de texte
function inputLength() {
    return input.value.length;
}

// Fonction pour créer un élément de liste avec une case à cocher, un texte et un bouton de suppression
function createListElement(taskText, taskId) {
// Création d'un nouvel élément de liste
    let li = document.createElement("li");
    li.id = taskId; // Utilisation de l'identifiant unique

// Création d'une case à cocher et ajout à l'élément de liste
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);

// Ajout du texte de la tâche à l'élément de liste
    li.appendChild(document.createTextNode(taskText));
    ul.appendChild(li);
    input.value = "";

// Fonction pour marquer/démarquer une tâche comme terminée
    function crossOut() {
        li.classList.toggle("done");
        // Mise à jour des données dans le localStorage
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

function addListAfterClick() {
    if (inputLength() > 0) {
        let taskId = uniqueId(); // Générer un identifiant unique
        // Créer un élément de liste avec l'identifiant unique
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

function deleteListItem(li) {
    li.classList.add("delete");
    li.remove();
}

function deleteCompletedTasks() {
    let completedTasks = document.querySelectorAll(".done");

    // Supprimer les tâches terminées avec une case à cocher
    completedTasks.forEach(function (task) {
        if (task.querySelector("input[type='checkbox']").checked) {
            deleteListItem(task);
        }
    });

    updateLocalStorage();
}

function updateLocalStorage() {
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

// Charger les tâches depuis le localStorage lors du chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let tasksArray = JSON.parse(savedTasks);
        tasksArray.forEach(function(task) {
            createListElement(task.text, task.id);
            if (task.done) {
                // Cocher la case à cocher si la tâche est marquée comme terminée
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
