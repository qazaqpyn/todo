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
        inputFolder.value="";
        refreshThis();
        h1folder = document.querySelectorAll(".folder-body h1");
        console.log(h1folder);
        showCurrentFolder();
    }
};


function showCurrentFolder(){
    h1folder.forEach(element => {
        element.addEventListener("click", () => {
            h1folder.forEach(h1=>{
                h1.classList.remove("folder-active");
            });
            element.classList.add("folder-active");
        });
    });
};

