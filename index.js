let list = document.querySelector(".list");
let data = [];
if (localStorage.getItem("element") !== null) {
    data = JSON.parse(localStorage.getItem("element"));
  
    data.forEach(task => {
      let li = document.createElement("li");
      let checbocxId = "checkbox" + Math.random().toString(36).substring(2, 9);
  
      li.innerHTML = `
        <input type="checkbox" id="${checbocxId}" class="checkbox" hidden>
        <label for="${checbocxId}" class="checkbox-label">
          <span class="span-check"></span>
        </label>
        <span class="task-text">${task.name}</span>
        <img src="images/icon-cross.svg" class="delet" style="cursor:pointer">
      `;
      list.appendChild(li);
  
      const checkbox = li.querySelector(".checkbox");
      const img = li.querySelector(".delet");
  
      checkbox.addEventListener("change", function () {
        const taskText = li.querySelector(".task-text");
        taskText.style.textDecoration = checkbox.checked ? "line-through" : "none"; 
        taskText.style.color = checkbox.checked ? "gray" : "";
        calculerLI();
        filterTasks(getSelectedFilter());
      });
  
      li.querySelector(".delet").addEventListener("click", () => {
        li.remove();
        data = data.filter(t => t.name !== task.name);
        localStorage.setItem("element", JSON.stringify(data)); 
        calculerLI();
        filterTasks(getSelectedFilter());
      });
    });
  }  
let mon = document.getElementById("moon");
const sun = document.getElementById("suun");
let input = document.querySelector(".input");
const main = document.querySelector(".main");
let header = document.querySelector("header");
let input1 = document.getElementById("input-1");
let itemCountDisplay = document.getElementById("items-left");
let span = document.querySelector(".checkbox-label")
let divmedia =document.querySelector('.filter-group')
const filterButtons = document.querySelectorAll('.filter');
const allFilter = document.getElementById("All");
const activeFilter = document.getElementById("Active");
const completedFilter = document.getElementById("Completed");



mon.addEventListener("click", () => {
  mon.style.display = "none";
  sun.style.display = "block";
  input.style.backgroundColor = "hsl(235, 24%, 19%)";
  input1.style.backgroundColor = "hsl(235, 24%, 19%)";
  input1.style.color = "hsl(233, 11%, 84%)";
  document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
  main.style.backgroundColor = "hsl(235, 24%, 19%)";
  main.style.color = "hsl(233, 11%, 84%)";
  main.style.boxShadow = "none";
  header.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
  span.style.backgroundColor="hsl(235, 24%, 19%)";
  divmedia.style.boxShadow ='none'
  divmedia.style.backgroundColor='hsl(235, 24%, 19%)';
});

sun.addEventListener("click", () => {
  document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
  mon.style.display = "block";
  sun.style.display = "none";
  input.style.backgroundColor = "white";
  input1.style.backgroundColor = "white";
  input1.style.color = "black";
  main.style.backgroundColor = "hsl(0, 0%, 98%)";
  main.style.color = "black";
  main.style.boxShadow = "0px 5px 5px darkgray";
  header.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
  span.style.backgroundColor="hsl(0, 0%, 98%)";
  divmedia.style.boxShadow =' none'
  divmedia.style.backgroundColor="hsl(0, 0%, 98%)";
});

input1.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let task = input1.value.trim();
  
      if (task === "") {
        alert("لا يمكن إضافة مهمة فارغة!");
        return;
      }
  
      let li = document.createElement("li");
      let checbocxId = "checkbox" + Date.now();
  
      li.innerHTML = `
        <input type="checkbox" id="${checbocxId}" class="checkbox" hidden>
        <label for="${checbocxId}" class="checkbox-label">
          <span class="span-check"></span>
        </label>
        <span class="task-text">${task}</span>
        <img src="images/icon-cross.svg" class="delet" style="cursor:pointer">
      `;
      
      list.appendChild(li);
      input1.value = "";
  
      data.push({ name: task, theme: true });
      localStorage.setItem("element", JSON.stringify(data)); 
  
      li.querySelector(".delet").addEventListener("click", () => {
        li.remove();
        data = data.filter(t => t.name !== task); 
        localStorage.setItem("element", JSON.stringify(data));
        calculerLI();
        filterTasks(getSelectedFilter());
      });
  
      const checkbox = li.querySelector(".checkbox");
      checkbox.addEventListener("change", function () {
        const taskText = li.querySelector(".task-text");
        taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
        taskText.style.color = checkbox.checked ? "hsl(233, 11%, 84%)" : "";
        calculerLI();
        filterTasks(getSelectedFilter());
      });
  
      calculerLI();
      filterTasks(getSelectedFilter());
    }
  });
  

function calculerLI() {
  const total = document.querySelectorAll(".list li input[type='checkbox']:not(:checked)").length;
  itemCountDisplay.textContent = `${total} items left`;
}

function filterTasks(type) {
  const tasks = document.querySelectorAll(".list li");

  tasks.forEach(task => {
    const checkbox = task.querySelector("input[type='checkbox']");
    const taskText = task.querySelector(".task-text");
  
    if (type === "All") {
      task.style.display = "flex";
      
      taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
      taskText.style.color = checkbox.checked ? "gray" : "";
    } else if (type === "Active") {
      task.style.display = !checkbox.checked ? "flex" : "none";
      taskText.style.textDecoration = "none";
      taskText.style.color = "";
    } else if (type === "Completed") {
      task.style.display = checkbox.checked ? "flex" : "none";
      taskText.style.textDecoration = "none";  
      
      taskText.style.color = "black";
    }
  });

  filterButtons.forEach(f => {
    f.classList.remove("selected");
  });
  document.getElementById(type).classList.add("selected");
  document.getElementById("Clear").addEventListener("click", () => {
      const tasks = document.querySelectorAll(".list li");
      tasks.forEach(task => {
        const checkbox = task.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
         
          task.remove();
    
        
          const taskText = task.querySelector(".task-text").textContent;
          data = data.filter(t => t.name !== taskText);
        }
      });
    
     
      localStorage.setItem("element", JSON.stringify(data));
    
   
      calculerLI();
      filterTasks(getSelectedFilter());
    });
    
}

function getSelectedFilter() {
  const selected = document.querySelector(".filter.selected");
  return selected ? selected.id : "All";
}


filterButtons.forEach(filter => {
  filter.addEventListener("click", () => {
    filterTasks(filter.id);
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.checkbox');
        
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                const listItem = checkbox.closest('li'); 
                const deleteIcon = listItem.querySelector('.delet'); 
                
                if (checkbox.checked) {
                
                    deleteIcon.style.display = 'block';
                } else {
                    
                    deleteIcon.style.display = 'none';
                }
            });
        });
  calculerLI();
});
