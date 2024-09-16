const input = document.querySelector("#taskIp");
const submitBtn = document.querySelector("#submitBtn");
const tasksDiv = document.querySelector(".tasksDiv");
let list = [];

if (localStorage.getItem("Tasks")){
    list= JSON.parse(localStorage.getItem("Tasks"))
    displayTask(list);
    saveToLocal(list);
}

submitBtn.onclick = function () {
    if(input.value !=""){
        tasksDiv.innerHTML = "";
        addTask(input.value);
        input.value = "";
        displayTask(list);
        saveToLocal(list);
    }
}

function addTask(taskText) {
    const newTask = {
        id: Date.now(),
        title: taskText,
        isDone: false,
    }
    list.push(newTask);
}

function displayTask(taskList) {
    tasksDiv.innerHTML = "";
    taskList.forEach(task => {
        if(task.isDone){
            tasksDiv.innerHTML += `<div id="${task.id}" class="task done">
                            <span>${task.title}</span>
                            <button class="delete" id="${task.id}">Delete</button>
                    </div>`;
        } else{
            tasksDiv.innerHTML += `<div id="${task.id}" class="task">
                            <span>${task.title}</span>
                            <button class="delete" id="${task.id}">Delete</button>
                    </div>`;
        }
    })
};

function saveToLocal(taskList){
    localStorage.setItem("Tasks", JSON.stringify(taskList));
}
function completeTask(id){
    list.forEach(el => {
        if(el.id == id){
            el.isDone = !el.isDone;
        }
    })
    displayTask(list);
}
function deleteTask(id){
    list = list.filter(task => task.id != id);
    displayTask(list);
    saveToLocal(list);
}

tasksDiv.addEventListener("click", (e)=> {
    if(e.target.classList.contains("delete")){
        deleteTask(e.target.getAttribute("id"))
    } else if (e.target.classList.contains("task")){
        let taskId= e.target.getAttribute("id");
        completeTask(taskId);
    }
})