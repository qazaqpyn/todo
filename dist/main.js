(()=>{"use strict";const e=document.querySelector(".folder-body"),t=document.querySelector(".task-body"),n=document.querySelector("#folder-button"),a=document.querySelector("#task-button"),d=document.querySelector("#folder-add");document.querySelector(".header");let c=document.querySelectorAll(".folder-body h1"),l=[];function r(){e.innerHTML="",l.forEach((t=>{let n=document.createElement("h1");n.innerText=t.getName(),e.appendChild(n)}))}function o(){var e,n;""!==d.value&&l.length<6&&(l.push((e=d.value,n=[],{getName:()=>e,getTasks:()=>n,addTask:(e,t,a)=>{n.push(((e,t,n)=>({getName:()=>e,getDone:()=>n,changeDone:()=>{n=!n},getDate:()=>t}))(e,t,a))},deleteTask:e=>{n.splice(e,1)}})),t.innerHTML="",d.value="",r(),c=document.querySelectorAll(".folder-body h1"),function(){for(let e=0;e<c.length;e++)c[e].addEventListener("click",(t=>{c.forEach((e=>{e.classList.remove("folder-active")})),c[e].classList.add("folder-active"),s(l[e])}));a.addEventListener("click",(()=>{for(let e=0;e<c.length;e++)if(console.log(c[e].classList),"folder-active"===c[e].classList.value){const n=document.createElement("input"),a=document.createElement("input"),d=document.createElement("div"),c=document.createElement("button");d.classList.add("task-adding"),n.setAttribute("placeholder","Name:"),a.setAttribute("placeholder","Date:"),a.setAttribute("type","date"),c.innerText="add",t.innerHTML="",d.append(n,a,c),t.appendChild(d),c.addEventListener("click",(()=>{i(n.value,a.value,e,!1),s(l[e])}))}}))}())}function i(e,t,n,a){""!==e&&""!==t&&l[n].getTasks().length<6&&l[n].addTask(e,t,a)}function s(e){t.innerHTML="";let n=0;e.getTasks().forEach((a=>{console.log(a);let d=document.createElement("div"),c=document.createElement("h1"),l=document.createElement("input"),r=document.createElement("button"),o=document.createElement("button"),u=document.createElement("div");l.setAttribute("type","checkbox"),l.setAttribute("id","_checkbox"),r.innerText="delete",o.innerText="edit",c.innerText=a.getName(),l.checked=a.getDone(),d.classList.add("taskDiv"),r.classList,r.name=n,l.name=n,o.name=n,u.append(o,r),d.append(l,c,u),t.appendChild(d),r.addEventListener("click",(t=>{!function(e,t){e.deleteTask(t.target.name),s(e)}(e,t)})),l.addEventListener("change",(t=>{!function(e,t){e.getTasks()[t.target.name].changeDone()}(e,t)})),o.addEventListener("click",(n=>{!function(e,n){let a=e.getTasks()[n.target.name].getName(),d=e.getTasks()[n.target.name].getDate(),c=e.getTasks()[n.target.name].getDone();t.innerHTML="";const l=document.createElement("input"),r=document.createElement("input"),o=document.createElement("div"),u=document.createElement("button");o.classList.add("task-adding"),l.setAttribute("placeholder","Name:"),r.setAttribute("placeholder","Date:"),r.setAttribute("type","date"),u.innerText="edit",l.value=a,r.value=d,o.append(l,r,u),t.appendChild(o),u.addEventListener("click",(()=>{e.deleteTask(n.target.name),i(l.value,r.value,n.target.name,c),s(e)}))}(e,n)})),n++}))}r(),d.addEventListener("keyup",(function(e){13===e.keyCode&&o()})),n.addEventListener("click",(()=>{o()}))})();