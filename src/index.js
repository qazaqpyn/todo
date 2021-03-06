import {Task, Folder} from './folder'

const folderBody = document.querySelector(".folder-body");
const taskBody = document.querySelector(".task-body");
const folderAdd = document.querySelector("#folder-button");
const taskAdd = document.querySelector("#task-button");
const inputFolder = document.querySelector("#folder-add");
const header = document.querySelector(".header");
let h1folder = document.querySelectorAll(".folder-body h1");

let dataFolder = [];
let currentStorage;

localStorage.clear();



if (storageAvailable('localStorage')) {
    if(!localStorage.getItem('dataFolder')) {
        populateStorage();
    } else {
        setStyles();
    } 
}
    else {
    currentStorage = dataFolder;
}


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
        localStorage.setItem('dataFolder', JSON.stringify(dataFolder));
        console.log(dataFolder);
        console.log("josn");
        console.log(JSON.parse(localStorage['dataFolder']));
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
                    addingListTasks(taskName.value,taskDate.value, i,false);
                    showTasks(dataFolder[i]);
                });
                
            }
        };
    });
};

function addingListTasks(name, date, i, done) {
    if (name !== "" && date !== "" && dataFolder[i].getTasks().length<6) {
        dataFolder[i].addTask(name,date,done);
        localStorage.setItem('dataFolder', JSON.stringify(dataFolder));
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
        checker.checked = element.getDone();
        taskDiv.classList.add("taskDiv");
        deleteButton.classList
        deleteButton.name = n;
        checker.name = n;
        editButton.name = n;
        buttondiv.append(editButton,deleteButton);
        taskDiv.append(checker,taskName,buttondiv);
        taskBody.appendChild(taskDiv);
        deleteButton.addEventListener("click",(e)=> {
            delete1Task(currentFolder,e);
        })
        checker.addEventListener("change", (e)=>{
            changeDoneChecker(currentFolder,e);
        });
        editButton.addEventListener("click", (e)=>{
            editTask(currentFolder,e);
        })
        n++;

    });
}

function delete1Task(currentFolder,e){
    currentFolder.deleteTask(e.target.name);
    showTasks(currentFolder);
};

function changeDoneChecker(currentFolder,e) {
    currentFolder.getTasks()[e.target.name].changeDone();
};

function editTask(currentFolder,e){
    let nameFolderEditing = currentFolder.getTasks()[e.target.name].getName();
    let dateFolderEditing = currentFolder.getTasks()[e.target.name].getDate();
    let doneFolderEditing = currentFolder.getTasks()[e.target.name].getDone();

    taskBody.innerHTML = "";

    const taskName = document.createElement("input");
    const taskDate = document.createElement("input");
    const divTask = document.createElement("div"); 
    const addTaskButton = document.createElement("button");
    divTask.classList.add("task-adding");
    taskName.setAttribute("placeholder","Name:");
    taskDate.setAttribute("placeholder", "Date:");
    taskDate.setAttribute("type","date");
    addTaskButton.innerText = "edit";
    taskName.value = nameFolderEditing;
    taskDate.value = dateFolderEditing;
    
    divTask.append(taskName,taskDate,addTaskButton);
    taskBody.appendChild(divTask);

    addTaskButton.addEventListener("click", ()=>{
        currentFolder.deleteTask(e.target.name);
        addingListTasks(taskName.value,taskDate.value, e.target.name, doneFolderEditing);
        showTasks(currentFolder);
    })

};

//localStorage
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
};

function setStyles() {
    currentStorage = localStorage.getItem('dataFolder');
    
    dataFolder = JSON.parse(currentStorage);
    console.log(localStorage['dataFolder']);
};

function populateStorage() {
    localStorage.setItem('dataFolder', JSON.stringify(dataFolder));
    setStyles();
};

