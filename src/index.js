import {Task, Folder} from './folder'

const folderBody = document.querySelector(".folder-body");
const taskBody = document.querySelector(".task-body");
const folderAdd = document.querySelector("#folder-button");
const taskAdd = document.querySelector("#task-button");
const inputFolder = document.querySelector("#folder-add");
const header = document.querySelector(".header");
let h1folder = document.querySelectorAll(".folder-body h1");


let dataFolder = [];
refreshThis();





//enter pressed
inputFolder.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        addingFolder();
    }
  });

//button pressed
folderAdd.addEventListener("click", ()=>{
    addingFolder();
});

function refreshThis () {
    folderBody.innerHTML= "";
    dataFolder.forEach(element => {
        let folderName = document.createElement("h1");
        folderName.innerText = element.getName();
        folderBody.appendChild(folderName);
    });
};

function addingFolder() {
    if (inputFolder.value !== "" && dataFolder.length<6) {
        dataFolder.push(Folder(inputFolder.value, []));
        taskBody.innerHTML ="";
        inputFolder.value="";
        refreshThis();
        h1folder = document.querySelectorAll(".folder-body h1");
        showCurrentFolder();
    }
};


function showCurrentFolder(){
    let id; 
    for(let i = 0; i<h1folder.length; i++) {
        h1folder[i].addEventListener("click", (e) => {
            h1folder.forEach(h1=>{
                h1.classList.remove("folder-active");
            });
            h1folder[i].classList.add("folder-active");
            showTasks(dataFolder[i]);
        });
    }
   
    addingTask();
};


function addingTask(){
    taskAdd.addEventListener("click", ()=>{
        for (let i = 0; i< h1folder.length; i++){
            console.log(h1folder[i].classList);
            if (h1folder[i].classList.value === "folder-active") {
                const taskName = document.createElement("input");
                const taskDate = document.createElement("input");
                const divTask = document.createElement("div"); 
                const addTaskButton = document.createElement("button");
                divTask.classList.add("task-adding");
                taskName.setAttribute("placeholder","Name:");
                taskDate.setAttribute("placeholder", "Date:");
                taskDate.setAttribute("type","date");
                addTaskButton.innerText = "add";
                taskBody.innerHTML = "";
                divTask.append(taskName,taskDate,addTaskButton);
                taskBody.appendChild(divTask);
                addTaskButton.addEventListener('click', ()=>{
                    addingListTasks(taskName.value,taskDate.value, i);
                    showTasks(dataFolder[i]);
                });
                
            }
        };
    });
};

function addingListTasks(name, date, i) {
    if (name !== "" && date !== "" && dataFolder[i].getTasks().length<6) {
        dataFolder[i].addTask(name,date,false);
    }
}

function showTasks (currentFolder) {
    taskBody.innerHTML = "";
    let n = 0;
    currentFolder.getTasks().forEach(element => {
        console.log(element);
        let taskDiv = document.createElement("div");
        let taskName = document.createElement("h1");
        let checker = document.createElement("input");
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");
        let buttondiv = document.createElement("div");
        checker.setAttribute("type", "checkbox");
        checker.setAttribute("id", "_checkbox");
        
        deleteButton.innerText = "delete";
        editButton.innerText = "edit";
        taskName.innerText = element.getName();
        taskDiv.classList.add("taskDiv");
        deleteButton.classList
        deleteButton.name = n;
        buttondiv.append(editButton,deleteButton);
        taskDiv.append(checker,taskName,buttondiv);
        taskBody.appendChild(taskDiv);
        deleteButton.addEventListener("click",(e)=> {
            delete1Task(currentFolder,e);
        })
        n++;

    });
}

function delete1Task(currentFolder,e){
    currentFolder.deleteTask(e.target.name);
    showTasks(currentFolder);
}