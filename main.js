(()=>{"use strict";const e=document.querySelector(".folder-body"),t=(document.querySelector(".task-body"),document.querySelector("#folder-button")),o=(document.querySelector("#task-button"),document.querySelector("#folder-add"));document.querySelector(".header");let c=document.querySelectorAll(".folder-body h1"),d=[];function r(){e.innerHTML="",d.forEach((t=>{let o=document.createElement("h1");o.innerText=t.getName(),e.appendChild(o)}))}function l(){var e,t;""!==o.value&&d.length<6&&(d.push((e=o.value,t=[],{getName:()=>e,getTasks:()=>t,addTask:(e,o,c)=>{t.push(((e,t,o)=>({getName:()=>e,getDone:()=>o,changeDone:()=>{o=!o}}))(e,0,c))},deleteTask:e=>{t.splice(e,1)}})),o.value="",r(),c=document.querySelectorAll(".folder-body h1"),console.log(c),c.forEach((e=>{e.addEventListener("click",(()=>{c.forEach((e=>{e.classList.remove("folder-active")})),e.classList.add("folder-active")}))})))}r(),o.addEventListener("keyup",(function(e){13===e.keyCode&&l()})),t.addEventListener("click",(()=>{l()}))})();